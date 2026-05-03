import { Router } from 'express';
import { z } from 'zod';
import type { OrderStatus, PaymentMethod } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { effectiveTaxBps, taxCentsFromSubtotal } from '../../../services/pricing';
import { getDefaultTaxBps } from '../../../services/settings';
import { buildCustomerReceiptJobs, buildKitchenTicketJobs } from '../../../services/printJob';
import { refreshTableOccupancyFromOrders } from '../../../services/tableOccupancy';
import { nextCommandNumber, utcCommandDate } from '../../../services/orderCommandSeq';
import { allocateUniqueOrderReference } from '../../../services/orderReference';
import type { SerializableOrder } from '../../../services/orderJson';
import {
  orderDetailInclude,
  orderEnrichedInclude,
  serializeOrderEnriched,
  serializeOrderSlim,
  serializeOrdersEnriched,
  serializeOrdersSlim,
} from '../../../services/orderJson';
import { generatePublicId, tenantEntityIdSchema } from '../../../services/publicId';
import { broadcastStaffRealtime } from '../../../realtime/broadcastStaffRealtime';

/** Money amounts (`price`, `subtotal`, `tva`, `total`) use the same integer unit as storage (JSON uses plain names, no `*_cents`). Line net = `count * price + Σ(extra.price * extra.count)`. */
const orderExtraSchema = z.object({
  /** Catalog extra id (12 hex) or modifier key (e.g. milk). */
  id: z.string().min(1).max(64),
  count: z.number().int().min(0).max(999),
  price: z.number().int().min(0),
});

const orderProductSchema = z.object({
  categoryId: tenantEntityIdSchema,
  id: tenantEntityIdSchema,
  count: z.number().int().min(1).max(999),
  price: z.number().int().min(0),
  extras: z.array(orderExtraSchema).optional().default([]),
});

const createOrderSchema = z
  .object({
    orderType: z.enum(['dine_in', 'takeaway']).default('takeaway'),
    tableId: tenantEntityIdSchema.nullable().optional(),
    note: z.string().max(2000).optional(),
    customerName: z.string().max(200).optional(),
    discount: z.number().int().min(0).max(100).optional().default(0),
    paymentMethod: z.enum(['cash', 'card', 'unpaid']).optional().default('unpaid'),
    /** Line net subtotal (before order-level discount). Must match server recomputation. */
    subtotal: z.number().int().min(0),
    /** Sum of line TVA amounts. Must match server. */
    tva: z.number().int().min(0),
    /** Final total after discount. Must match server. */
    total: z.number().int().min(0),
    products: z.array(orderProductSchema).min(1),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === 'dine_in') {
      if (!data.tableId) {
        ctx.addIssue({
          code: 'custom',
          message: 'dine_in orders require tableId',
          path: ['tableId'],
        });
      }
    } else if (data.tableId != null) {
      ctx.addIssue({
        code: 'custom',
        message: 'takeaway orders must not include tableId',
        path: ['tableId'],
      });
    }
  });

export const ordersRouter = Router();
ordersRouter.use(requireStaff);

function extrasChargeCents(
  extras: { id: string; count: number; price: number }[],
): number {
  let s = 0;
  for (const e of extras) {
    s += Math.round(e.price) * Math.round(e.count);
  }
  return s;
}

ordersRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) return;

    const prisma = req.tenant.prisma;

    const {
      orderType,
      tableId: bodyTableId,
      products: inputProducts,
      discount,
      paymentMethod,
    } = parsed.data;
    const tableId = orderType === 'takeaway' ? undefined : bodyTableId!;

    if (orderType === 'dine_in') {
      const tableRow = await prisma.restaurantTable.findFirst({
        where: { id: tableId!, isActive: true },
      });
      if (!tableRow) {
        sendError(res, 400, 'table_not_found', 'Table not found or inactive', { tableId });
        return;
      }
    }

    const defaultTax = await getDefaultTaxBps(prisma);

    try {
      const { order, tableBroadcast } = await prisma.$transaction(async (tx) => {
        let subtotal = 0;
        let taxTotal = 0;
        const lineRows: {
          productId: string;
          categoryId: string;
          quantity: number;
          unitPriceCents: number;
          lineTotalCents: number;
          taxCents: number;
          modifiersSnapshot: unknown | null;
          compositionSnapshot: unknown | null;
          extrasSnapshot: unknown;
        }[] = [];

        for (const row of inputProducts) {
          const product = await tx.product.findFirst({
            where: { id: row.id, isActive: true },
          });
          if (!product) {
            throw new ProductNotFoundError(row.id);
          }
          if (product.categoryId !== row.categoryId) {
            throw new CategoryMismatchError(row.id, row.categoryId, product.categoryId);
          }

          const extras = row.extras ?? [];
          const extraSum = extrasChargeCents(extras);
          const lineTotalCents = row.count * row.price + extraSum;
          const unitPriceCents = Math.round(lineTotalCents / row.count);
          const taxBps = effectiveTaxBps(product.taxRateBps, defaultTax);
          const lineTax = taxCentsFromSubtotal(lineTotalCents, taxBps);
          subtotal += lineTotalCents;
          taxTotal += lineTax;

          lineRows.push({
            productId: product.id,
            categoryId: row.categoryId,
            quantity: row.count,
            unitPriceCents,
            lineTotalCents,
            taxCents: lineTax,
            modifiersSnapshot: null,
            compositionSnapshot: null,
            extrasSnapshot: extras.map((e) => ({ id: e.id, count: e.count, price: e.price })),
          });
        }

        const grossTotal = subtotal + taxTotal;
        const discountPriceCents = Math.round((grossTotal * discount) / 100);
        const totalCents = grossTotal - discountPriceCents;

        if (
          parsed.data.subtotal !== subtotal ||
          parsed.data.tva !== taxTotal ||
          parsed.data.total !== totalCents
        ) {
          throw new TotalsMismatchError(
            { subtotal, tva: taxTotal, total: totalCents },
            {
              subtotal: parsed.data.subtotal,
              tva: parsed.data.tva,
              total: parsed.data.total,
            },
          );
        }

        const commandDate = utcCommandDate(new Date());
        const commandNumber = await nextCommandNumber(tx, commandDate);
        const reference = await allocateUniqueOrderReference(tx);

        const created = await tx.order.create({
          data: {
            id: generatePublicId(),
            reference,
            status: 'waiting',
            orderType,
            tableId: tableId ?? undefined,
            staffId: req.staff!.id,
            note: parsed.data.note ?? undefined,
            customerName: parsed.data.customerName ?? undefined,
            discount,
            discountPriceCents,
            commandDate,
            commandNumber,
            subtotalCents: subtotal,
            taxCents: taxTotal,
            totalCents,
            paymentMethod: paymentMethod as PaymentMethod,
            lines: {
              create: lineRows.map((r) => ({
                id: generatePublicId(),
                productId: r.productId,
                categoryId: r.categoryId,
                quantity: r.quantity,
                unitPriceCents: r.unitPriceCents,
                lineTotalCents: r.lineTotalCents,
                taxCents: r.taxCents,
                modifiersSnapshot: r.modifiersSnapshot ?? undefined,
                compositionSnapshot: r.compositionSnapshot ?? undefined,
                extrasSnapshot: r.extrasSnapshot as object,
              })),
            },
          },
          include: orderDetailInclude,
        });

        let tableBroadcast: { tableId: string; status: 'free' | 'occupied' } | undefined;
        if (orderType === 'dine_in' && tableId) {
          const status = await refreshTableOccupancyFromOrders(tx, tableId);
          tableBroadcast = { tableId, status };
        }

        return { order: created, tableBroadcast };
      });

      const orderJson = serializeOrderSlim(order);
      const ts = new Date().toISOString();
      broadcastStaffRealtime(req.tenant.id, {
        v: 1,
        type: 'order.created',
        orderId: order.id,
        order: orderJson,
        ts,
      });
      if (tableBroadcast) {
        broadcastStaffRealtime(req.tenant.id, {
          v: 1,
          type: 'table.updated',
          tableId: tableBroadcast.tableId,
          status: tableBroadcast.status,
          ts,
        });
      }

      const printJobs = [
        ...buildCustomerReceiptJobs({
          order,
          lines: order.lines.map((l) => ({ ...l, product: l.product })),
          venueName: req.tenant.slug,
        }),
        ...buildKitchenTicketJobs({
          order,
          lines: order.lines.map((l) => ({ ...l, product: l.product })),
        }),
      ];

      res.status(201).json({ order: orderJson, printJobs });
    } catch (e) {
      if (e instanceof ProductNotFoundError) {
        sendError(res, 400, 'product_not_found', 'Product not found or inactive', {
          productId: e.productId,
        });
        return;
      }
      if (e instanceof CategoryMismatchError) {
        sendError(res, 400, 'category_mismatch', 'categoryId does not match product category', {
          productId: e.productId,
          categoryId: e.sentCategoryId,
          expectedCategoryId: e.actualCategoryId,
        });
        return;
      }
      if (e instanceof TotalsMismatchError) {
        sendError(res, 400, 'totals_mismatch', 'subtotal, tva, and total must match server totals', {
          expected: e.expected,
          received: e.received,
        });
        return;
      }
      throw e;
    }
  }),
);

class ProductNotFoundError extends Error {
  constructor(public productId: string) {
    super('product_not_found');
    this.name = 'ProductNotFoundError';
  }
}

class CategoryMismatchError extends Error {
  constructor(
    public productId: string,
    public sentCategoryId: string,
    public actualCategoryId: string,
  ) {
    super('category_mismatch');
    this.name = 'CategoryMismatchError';
  }
}

class TotalsMismatchError extends Error {
  constructor(
    public expected: { subtotal: number; tva: number; total: number },
    public received: { subtotal: number; tva: number; total: number },
  ) {
    super('totals_mismatch');
    this.name = 'TotalsMismatchError';
  }
}

const orderStatuses = [
  'waiting',
  'confirmed',
  'preparing',
  'completed',
  'canceled',
] as const;

ordersRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const statusRaw = typeof req.query.status === 'string' ? req.query.status : undefined;
    const status =
      statusRaw && orderStatuses.includes(statusRaw as (typeof orderStatuses)[number])
        ? (statusRaw as OrderStatus)
        : undefined;
    const take = Math.min(100, Math.max(1, Number(req.query.limit ?? 50)));

    const where = status ? { status } : {};

    const rows = await req.tenant.prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
      include: orderDetailInclude,
    });
    const ordersJson = serializeOrdersSlim(rows);
    res.json({ orders: ordersJson });
  }),
);

ordersRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }
    const row = await req.tenant.prisma.order.findUnique({
      where: { id },
      include: orderEnrichedInclude,
    });
    if (!row) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }
    res.json({ order: await serializeOrderEnriched(req, req.tenant.prisma, row) });
  }),
);

ordersRouter.patch(
  '/:id/status',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const schema = z.object({
      status: z.enum(orderStatuses),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    try {
      const orderId = paramId(req);
      if (!orderId) {
        sendError(res, 400, 'validation_error', 'Missing order id');
        return;
      }
      const prisma = req.tenant.prisma;
      let tableBroadcast: { tableId: string; status: 'free' | 'occupied' } | undefined;
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: parsed.data.status as OrderStatus },
        include: orderEnrichedInclude,
      });
      if (order.tableId && order.orderType === 'dine_in') {
        const status = await refreshTableOccupancyFromOrders(prisma, order.tableId);
        tableBroadcast = { tableId: order.tableId, status };
      }

      const ts = new Date().toISOString();
      const orderRealtime = serializeOrderSlim(order as SerializableOrder);
      broadcastStaffRealtime(req.tenant.id, {
        v: 1,
        type: 'order.updated',
        orderId: order.id,
        status: order.status,
        order: orderRealtime,
        ts,
      });
      if (tableBroadcast) {
        broadcastStaffRealtime(req.tenant.id, {
          v: 1,
          type: 'table.updated',
          tableId: tableBroadcast.tableId,
          status: tableBroadcast.status,
          ts,
        });
      }

      const orderJson = await serializeOrderEnriched(req, prisma, order);
      res.json({ order: orderJson });
    } catch {
      sendError(res, 404, 'not_found', 'Order not found');
    }
  }),
);
