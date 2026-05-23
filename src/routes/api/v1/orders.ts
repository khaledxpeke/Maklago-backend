import { Router } from 'express';
import { z } from 'zod';
import type { OrderStatus, PaymentMethod } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { discountPercentSchema, moneyMajorSchema } from '../../../http/money';
import { requireStaff } from '../../../middleware/requireStaff';
import { getDefaultTaxBps } from '../../../services/settings';
import {
  logOrderCartUpdated,
  logOrderCreated,
  logOrderPaymentRecorded,
  logOrderStatusChanged,
  logOrderTableChanged,
} from '../../../services/activityLog';
import {
  buildOrderCartFromProducts,
  CategoryMismatchError,
  MissingLinePriceError,
  normalizeOrderCartProducts,
  OrderNotEditableError,
  OrderNotFoundError,
  ProductNotFoundError,
  replaceOrderCart,
  TotalsMismatchError,
} from '../../../services/orderCart';
import { buildCustomerReceiptJobs, buildKitchenTicketJobs } from '../../../services/printJob';
import { refreshTableOccupancyFromOrders, TABLE_OCCUPYING_ORDER_STATUSES } from '../../../services/tableOccupancy';
import { nextCommandNumber, utcCommandDate } from '../../../services/orderCommandSeq';
import { allocateUniqueOrderReference } from '../../../services/orderReference';
import type { SerializableOrder } from '../../../services/orderJson';
import {
  orderDetailInclude,
  orderEnrichedInclude,
  serializeOrderEnriched,
  serializeOrderSlim,
  serializeOrdersEnriched,
} from '../../../services/orderJson';
import { activityLogToJson, listActivityLogs } from '../../../services/activityLog';
import { generatePublicId, tenantEntityIdSchema } from '../../../services/publicId';
import {
  emitOrderCreatedRealtime,
  emitOrderUpdatedRealtime,
} from '../../../realtime/emitOrderRealtime';
import type { Response } from 'express';

type TableBroadcast = { tableId: string; status: 'free' | 'occupied' };

async function refreshTableBroadcasts(
  prisma: Parameters<typeof refreshTableOccupancyFromOrders>[0],
  tableIds: (string | null | undefined)[],
): Promise<TableBroadcast[]> {
  const seen = new Set<string>();
  const out: TableBroadcast[] = [];
  for (const id of tableIds) {
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const status = await refreshTableOccupancyFromOrders(prisma, id);
    out.push({ tableId: id, status });
  }
  return out;
}

/** Dine-in orders that can still be moved to another table. */
const MUTABLE_DINE_IN_STATUSES: OrderStatus[] = ['confirmed', 'preparing'];

/** Statuses staff may set via PATCH (waiting is reserved for future QR/web intake). */
const PATCHABLE_ORDER_STATUSES = ['confirmed', 'preparing', 'completed', 'canceled'] as const;

class InvalidStatusTransitionError extends Error {
  constructor(
    public from: OrderStatus,
    public to: OrderStatus,
  ) {
    super('invalid_status_transition');
    this.name = 'InvalidStatusTransitionError';
  }
}

function assertOrderStatusTransition(from: OrderStatus, to: OrderStatus): void {
  if (from === to) return;
  if (from === 'completed' || from === 'canceled') {
    throw new InvalidStatusTransitionError(from, to);
  }
  const allowed: Partial<Record<OrderStatus, OrderStatus[]>> = {
    confirmed: ['preparing', 'completed', 'canceled'],
    preparing: ['completed', 'canceled'],
    waiting: ['confirmed', 'canceled'],
  };
  if (!allowed[from]?.includes(to)) {
    throw new InvalidStatusTransitionError(from, to);
  }
}

/** Money amounts (`price`, `subtotal`, `tva`, `total`) use major currency units in JSON (e.g. 2.5 TND); DB keeps cents. */
const orderExtraSchema = z.object({
  id: z.string().min(1).max(64),
  count: z.coerce.number().int().min(0).max(999),
  price: moneyMajorSchema.optional(),
  priceCents: z.coerce.number().int().min(0).optional(),
});

const orderProductSchema = z.object({
  categoryId: tenantEntityIdSchema,
  id: tenantEntityIdSchema,
  count: z.coerce.number().int().min(1).max(999),
  price: moneyMajorSchema.optional(),
  priceCents: z.coerce.number().int().min(0).optional(),
  extras: z.array(orderExtraSchema).optional().default([]),
});

const createOrderSchema = z
  .object({
    orderType: z.enum(['dine_in', 'takeaway']).default('takeaway'),
    tableId: tenantEntityIdSchema.nullable().optional(),
    note: z.string().max(2000).optional(),
    customerName: z.string().max(200).optional(),
    discount: discountPercentSchema.optional().default(0),
    paymentMethod: z.enum(['cash', 'card', 'unpaid']).optional().default('unpaid'),
    subtotal: moneyMajorSchema,
    tva: moneyMajorSchema,
    total: moneyMajorSchema,
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
    refineCartProductPrices(data, ctx);
  });

function refineCartProductPrices(
  data: { products: z.infer<typeof orderProductSchema>[] },
  ctx: z.RefinementCtx,
): void {
  data.products.forEach((p, i) => {
    if (p.price === undefined && p.priceCents === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: 'Provide price (major units, e.g. 2.5) or priceCents on each line',
        path: ['products', i, 'price'],
      });
    }
    (p.extras ?? []).forEach((e, j) => {
      if (e.price === undefined && e.priceCents === undefined) {
        ctx.addIssue({
          code: 'custom',
          message: 'Provide price or priceCents on each extra',
          path: ['products', i, 'extras', j, 'price'],
        });
      }
    });
  });
}

export const editOrderSchema = z
  .object({
    products: z.array(orderProductSchema).min(1),
    subtotal: moneyMajorSchema,
    tva: moneyMajorSchema,
    total: moneyMajorSchema,
    note: z.string().max(2000).optional(),
    customerName: z.string().max(200).optional(),
    discount: discountPercentSchema.optional(),
  })
  .superRefine((data, ctx) => refineCartProductPrices(data, ctx));

export function sendOrderCartErrors(res: Response, e: unknown): boolean {
  if (e instanceof ProductNotFoundError) {
    sendError(res, 400, 'product_not_found', 'Product not found or inactive', {
      productId: e.productId,
    });
    return true;
  }
  if (e instanceof CategoryMismatchError) {
    sendError(res, 400, 'category_mismatch', 'categoryId does not match product category', {
      productId: e.productId,
      categoryId: e.sentCategoryId,
      expectedCategoryId: e.actualCategoryId,
    });
    return true;
  }
  if (e instanceof TotalsMismatchError) {
    sendError(res, 400, 'totals_mismatch', 'subtotal, tva, and total must match server totals', {
      expected: e.expected,
      received: e.received,
    });
    return true;
  }
  if (e instanceof MissingLinePriceError) {
    sendError(res, 400, 'validation_error', 'Each line and extra needs price (major units, e.g. 2.5) or priceCents', {
      field: e.field,
    });
    return true;
  }
  if (e instanceof OrderNotFoundError) {
    sendError(res, 404, 'not_found', 'Order not found');
    return true;
  }
  if (e instanceof OrderNotEditableError) {
    sendError(res, 400, 'order_not_editable', 'Order cannot be edited in its current status', {
      status: e.status,
    });
    return true;
  }
  return false;
}

export const ordersRouter = Router();
ordersRouter.use(requireStaff);

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
      products: rawProducts,
      discount,
      paymentMethod,
    } = parsed.data;
    let inputProducts;
    try {
      inputProducts = normalizeOrderCartProducts(rawProducts);
    } catch (e) {
      if (sendOrderCartErrors(res, e)) return;
      throw e;
    }
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
      const { order, tableBroadcasts } = await prisma.$transaction(async (tx) => {
        const cart = await buildOrderCartFromProducts(
          tx,
          inputProducts,
          discount,
          {
            subtotal: parsed.data.subtotal,
            tva: parsed.data.tva,
            total: parsed.data.total,
          },
          defaultTax,
        );

        const commandDate = utcCommandDate(new Date());
        const commandNumber = await nextCommandNumber(tx, commandDate);
        const reference = await allocateUniqueOrderReference(tx);

        const created = await tx.order.create({
          data: {
            id: generatePublicId(),
            reference,
            status: 'confirmed',
            orderType,
            tableId: tableId ?? undefined,
            staffId: req.staff!.id,
            note: parsed.data.note ?? undefined,
            customerName: parsed.data.customerName ?? undefined,
            discount,
            discountPriceCents: cart.discountPriceCents,
            commandDate,
            commandNumber,
            subtotalCents: cart.subtotalCents,
            taxCents: cart.taxCents,
            totalCents: cart.totalCents,
            paymentMethod: paymentMethod as PaymentMethod,
            lines: {
              create: cart.lineRows.map((r) => ({
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

        let tableBroadcasts: TableBroadcast[] = [];
        if (orderType === 'dine_in' && tableId) {
          tableBroadcasts = await refreshTableBroadcasts(tx, [tableId]);
        }

        return { order: created, tableBroadcasts };
      });

      const orderJson = serializeOrderSlim(order);
      await emitOrderCreatedRealtime(req.tenant.id, req.tenant.prisma, order, tableBroadcasts);

      await logOrderCreated(req.tenant.prisma, req.staff!.id, {
        id: order.id,
        reference: order.reference,
        commandNumber: order.commandNumber,
        orderType: order.orderType,
        tableId: order.tableId,
        status: order.status,
        totalCents: order.totalCents,
        lineCount: order.lines.length,
      });

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
      if (sendOrderCartErrors(res, e)) return;
      throw e;
    }
  }),
);

ordersRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const parsed = editOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    const orderId = paramId(req);
    if (!orderId) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }

    try {
      const existing = await req.tenant.prisma.order.findUnique({ where: { id: orderId } });
      if (!existing) {
        sendError(res, 404, 'not_found', 'Order not found');
        return;
      }
      const hadPaid = existing.paymentMethod === 'cash' || existing.paymentMethod === 'card';
      const order = await replaceOrderCart(req.tenant.prisma, orderId, {
        ...parsed.data,
        products: normalizeOrderCartProducts(parsed.data.products),
      });
      await emitOrderUpdatedRealtime(req.tenant.id, req.tenant.prisma, order);
      await logOrderCartUpdated(req.tenant.prisma, req.staff!.id, orderId, {
        lineCount: order.lines.length,
        totalCents: order.totalCents,
        paymentReset: hadPaid,
      });
      const enriched = await req.tenant.prisma.order.findUnique({
        where: { id: orderId },
        include: orderEnrichedInclude,
      });
      res.json({ order: await serializeOrderEnriched(req, req.tenant.prisma, enriched!) });
    } catch (e) {
      if (sendOrderCartErrors(res, e)) return;
      throw e;
    }
  }),
);

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
      include: orderEnrichedInclude,
    });
    const ordersJson = await serializeOrdersEnriched(req, req.tenant.prisma, rows);
    res.json({ orders: ordersJson });
  }),
);

ordersRouter.get(
  '/:id/logs',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }
    const order = await req.tenant.prisma.order.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!order) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }
    const take = Math.min(200, Math.max(1, Number(req.query.limit ?? 50)));
    const rows = await listActivityLogs(req.tenant.prisma, {
      entityType: 'order',
      entityId: id,
      take,
    });
    res.json({ logs: rows.map(activityLogToJson) });
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
  '/:id/table',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const schema = z.object({ tableId: tenantEntityIdSchema });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    const orderId = paramId(req);
    if (!orderId) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }

    const prisma = req.tenant.prisma;
    const existing = await prisma.order.findUnique({ where: { id: orderId } });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }
    if (existing.orderType !== 'dine_in') {
      sendError(res, 400, 'not_dine_in', 'Only dine-in orders can be assigned to a table');
      return;
    }
    if (!MUTABLE_DINE_IN_STATUSES.includes(existing.status)) {
      sendError(res, 400, 'order_closed', 'Cannot change table on a completed or canceled order');
      return;
    }

    const nextTableId = parsed.data.tableId;
    if (existing.tableId === nextTableId) {
      const row = await prisma.order.findUnique({
        where: { id: orderId },
        include: orderEnrichedInclude,
      });
      res.json({ order: await serializeOrderEnriched(req, prisma, row!) });
      return;
    }

    const tableRow = await prisma.restaurantTable.findFirst({
      where: { id: nextTableId, isActive: true },
    });
    if (!tableRow) {
      sendError(res, 400, 'table_not_found', 'Table not found or inactive', { tableId: nextTableId });
      return;
    }

    const occupyingOnTarget = await prisma.order.count({
      where: {
        id: { not: orderId },
        tableId: nextTableId,
        orderType: 'dine_in',
        status: { in: TABLE_OCCUPYING_ORDER_STATUSES },
      },
    });
    if (occupyingOnTarget > 0) {
      sendError(res, 409, 'table_occupied', 'Target table already has an active dine-in order');
      return;
    }

    const previousTableId = existing.tableId;
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { tableId: nextTableId },
        include: orderDetailInclude,
      });

      const tableBroadcasts = await refreshTableBroadcasts(prisma, [previousTableId, order.tableId]);
      await emitOrderUpdatedRealtime(req.tenant.id, req.tenant.prisma, order, tableBroadcasts);

      if (req.staff) {
        await logOrderTableChanged(
          prisma,
          req.staff.id,
          orderId,
          previousTableId,
          nextTableId,
        );
      }

      const enriched = await prisma.order.findUnique({
        where: { id: orderId },
        include: orderEnrichedInclude,
      });
      res.json({ order: await serializeOrderEnriched(req, prisma, enriched!) });
    } catch {
      sendError(res, 404, 'not_found', 'Order not found');
    }
  }),
);

ordersRouter.patch(
  '/:id/payment',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const schema = z
      .object({
        paymentMethod: z.enum(['cash', 'card']).optional(),
        paymentType: z.enum(['cash', 'card']).optional(),
      })
      .refine((d) => d.paymentMethod !== undefined || d.paymentType !== undefined, {
        message: 'paymentMethod or paymentType is required',
      });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    const orderId = paramId(req);
    if (!orderId) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }

    const method = (parsed.data.paymentMethod ?? parsed.data.paymentType)! as PaymentMethod;
    const prisma = req.tenant.prisma;
    const existing = await prisma.order.findUnique({ where: { id: orderId } });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }
    if (existing.status === 'canceled') {
      sendError(res, 400, 'order_canceled', 'Cannot pay a canceled order');
      return;
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { paymentMethod: method },
      include: orderDetailInclude,
    });

    await emitOrderUpdatedRealtime(req.tenant.id, prisma, order);

    if (req.staff) {
      await logOrderPaymentRecorded(
        prisma,
        req.staff.id,
        orderId,
        method,
        existing.paymentMethod,
      );
    }

    const enriched = await prisma.order.findUnique({
      where: { id: orderId },
      include: orderEnrichedInclude,
    });
    res.json({ order: await serializeOrderEnriched(req, prisma, enriched!) });
  }),
);

ordersRouter.patch(
  '/:id/status',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const schema = z.object({
      status: z.enum(PATCHABLE_ORDER_STATUSES),
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
      const existing = await prisma.order.findUnique({ where: { id: orderId } });
      if (!existing) {
        sendError(res, 404, 'not_found', 'Order not found');
        return;
      }

      const nextStatus = parsed.data.status as OrderStatus;
      try {
        assertOrderStatusTransition(existing.status, nextStatus);
      } catch (e) {
        if (e instanceof InvalidStatusTransitionError) {
          sendError(res, 400, 'invalid_status_transition', `Cannot change status from ${e.from} to ${e.to}`, {
            from: e.from,
            to: e.to,
          });
          return;
        }
        throw e;
      }

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: nextStatus },
        include: orderDetailInclude,
      });

      const tableBroadcasts =
        order.orderType === 'dine_in' && order.tableId
          ? await refreshTableBroadcasts(prisma, [order.tableId])
          : [];

      await emitOrderUpdatedRealtime(req.tenant.id, req.tenant.prisma, order, tableBroadcasts);

      if (req.staff) {
        await logOrderStatusChanged(
          prisma,
          req.staff.id,
          orderId,
          existing.status,
          nextStatus,
        );
      }

      const enriched = await prisma.order.findUnique({
        where: { id: orderId },
        include: orderEnrichedInclude,
      });
      res.json({ order: await serializeOrderEnriched(req, prisma, enriched!) });
    } catch {
      sendError(res, 404, 'not_found', 'Order not found');
    }
  }),
);
