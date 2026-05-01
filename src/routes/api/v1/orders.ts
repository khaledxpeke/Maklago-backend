import { Router } from 'express';
import { z } from 'zod';
import type { OrderStatus } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { majorToCents } from '../../../http/money';
import {
  CompositionValidationError,
  loadComposedProductSteps,
  resolveCompositionSelection,
} from '../../../services/composition';
import {
  effectiveTaxBps,
  lineSubtotalCents,
  modifierDeltaCents,
  parseModifiersJson,
  taxCentsFromSubtotal,
} from '../../../services/pricing';
import { getDefaultTaxBps } from '../../../services/settings';
import { buildCustomerReceiptJobs, buildKitchenTicketJobs } from '../../../services/printJob';

const lineSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(999),
  modifierIds: z.array(z.string()).optional(),
  /// Required for `COMPOSED` products: one entry per composition step, same order as `GET /catalog/products/:id`.
  composition: z
    .object({
      steps: z.array(
        z.object({
          compositionTypeId: z.string().uuid(),
          ingredientIds: z.array(z.string().uuid()),
        }),
      ),
    })
    .optional(),
  note: z.string().max(500).optional(),
});

const createOrderSchema = z.object({
  tableId: z.string().uuid().nullable().optional(),
  sessionId: z.string().uuid().nullable().optional(),
  status: z.enum(['DRAFT', 'ACTIVE']).default('ACTIVE'),
  /// Mongo History-like metadata for receipts / exports (optional).
  customerName: z.string().max(200).optional(),
  customerEmail: z.string().email().optional(),
  commandNumber: z.number().int().optional(),
  currency: z.string().max(16).optional(),
  pack: z.unknown().optional(),
  paymentMethod: z.unknown().optional(),
  /** Order-level discount in main currency units or cents */
  orderDiscountValue: z.number().nonnegative().optional(),
  orderDiscountValueCents: z.number().int().min(0).optional(),
  logoPath: z.string().max(2048).optional(),
  lines: z.array(lineSchema).min(1),
});

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

    const idemHeader = req.headers['idempotency-key'];
    const idemKey = Array.isArray(idemHeader) ? idemHeader[0] : idemHeader;
    const prisma = req.tenant.prisma;

    if (idemKey) {
      const existing = await prisma.order.findUnique({
        where: { idempotencyKey: idemKey },
        include: { lines: { include: { product: true } } },
      });
      if (existing) {
        const printJobs = [
          ...buildCustomerReceiptJobs({
            order: existing,
            lines: existing.lines.map((l) => ({ ...l, product: l.product })),
            venueName: req.tenant.slug,
          }),
          ...buildKitchenTicketJobs({
            order: existing,
            lines: existing.lines.map((l) => ({ ...l, product: l.product })),
          }),
        ];
        res.status(200).json({ order: existing, printJobs, idempotentReplay: true });
        return;
      }
    }

    const { tableId, sessionId, status, lines: inputLines } = parsed.data;
    const defaultTax = await getDefaultTaxBps(prisma);

    try {
      const order = await prisma.$transaction(async (tx) => {
        let subtotal = 0;
        let taxTotal = 0;
        const lineRows: {
          productId: string;
          quantity: number;
          unitPriceCents: number;
          lineTotalCents: number;
          taxCents: number;
          modifiersSnapshot: unknown;
          compositionSnapshot: unknown | null;
          note: string | null;
        }[] = [];

        for (const line of inputLines) {
          const product = await tx.product.findFirst({
            where: { id: line.productId, isActive: true },
          });
          if (!product) {
            throw new ProductNotFoundError(line.productId);
          }

          let extra = 0;
          let modifiersSnapshot: unknown;
          let compositionSnapshot: unknown | null = null;

          if (product.kind === 'COMPOSED') {
            if (!line.composition?.steps?.length) {
              throw new OrderLineCompositionError(
                'composition_required',
                'Composed products require composition.steps (one object per step, same order as the product).',
                line.productId,
              );
            }
            const steps = await loadComposedProductSteps(tx, product.id);
            if (!steps.length) {
              throw new OrderLineCompositionError(
                'product_misconfigured',
                'This product is marked composed but has no composition steps configured.',
                line.productId,
              );
            }
            const resolved = resolveCompositionSelection(steps, line.composition.steps);
            extra = resolved.extraCents;
            compositionSnapshot = resolved.snapshot;
            modifiersSnapshot = { selectedIds: [], defs: [] };
          } else {
            if (line.composition?.steps?.length) {
              throw new OrderLineCompositionError(
                'composition_not_allowed',
                'Simple products cannot include composition.steps; use modifierIds instead.',
                line.productId,
              );
            }
            const defs = parseModifiersJson(product.modifiers);
            const selected = line.modifierIds ?? [];
            extra = modifierDeltaCents(defs, selected);
            modifiersSnapshot = { selectedIds: selected, defs };
          }

          const unitBase = product.price + extra;
          const taxBps = effectiveTaxBps(product.taxRateBps, defaultTax);
          const lineSub = lineSubtotalCents(product.price, line.quantity, extra);
          const lineTax = taxCentsFromSubtotal(lineSub, taxBps);
          subtotal += lineSub;
          taxTotal += lineTax;

          lineRows.push({
            productId: product.id,
            quantity: line.quantity,
            unitPriceCents: unitBase,
            lineTotalCents: lineSub,
            taxCents: lineTax,
            modifiersSnapshot,
            compositionSnapshot,
            note: line.note ?? null,
          });
        }

        const total = subtotal + taxTotal;
        const {
          customerName,
          customerEmail,
          commandNumber,
          currency,
          pack,
          paymentMethod,
          orderDiscountValue,
          orderDiscountValueCents,
          logoPath,
        } = parsed.data;
        const orderDisc =
          orderDiscountValueCents ??
          (orderDiscountValue !== undefined ? majorToCents(orderDiscountValue) : 0);

        return tx.order.create({
          data: {
            status: status as OrderStatus,
            tableId: tableId ?? undefined,
            sessionId: sessionId ?? undefined,
            staffId: req.staff!.id,
            subtotalCents: subtotal,
            taxCents: taxTotal,
            totalCents: total,
            idempotencyKey: idemKey ?? null,
            customerName: customerName ?? undefined,
            customerEmail: customerEmail ?? undefined,
            commandNumber: commandNumber ?? undefined,
            currency: currency ?? undefined,
            pack: pack !== undefined ? (pack as object) : undefined,
            paymentMethod: paymentMethod !== undefined ? (paymentMethod as object) : undefined,
            orderDiscountValue: orderDisc,
            logoPath: logoPath ?? undefined,
            lines: {
              create: lineRows.map((r) => ({
                productId: r.productId,
                quantity: r.quantity,
                unitPriceCents: r.unitPriceCents,
                lineTotalCents: r.lineTotalCents,
                taxCents: r.taxCents,
                modifiersSnapshot: r.modifiersSnapshot as object,
                compositionSnapshot: r.compositionSnapshot as object | undefined,
                note: r.note ?? undefined,
              })),
            },
          },
          include: { lines: { include: { product: true } } },
        });
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

      res.status(201).json({ order, printJobs });
    } catch (e) {
      if (e instanceof ProductNotFoundError) {
        sendError(res, 400, 'product_not_found', 'Product not found or inactive', {
          productId: e.productId,
        });
        return;
      }
      if (e instanceof CompositionValidationError) {
        sendError(res, 400, e.code, e.message);
        return;
      }
      if (e instanceof OrderLineCompositionError) {
        sendError(res, 400, e.code, e.message, { productId: e.productId });
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

class OrderLineCompositionError extends Error {
  constructor(
    public code: string,
    message: string,
    public productId: string,
  ) {
    super(message);
    this.name = 'OrderLineCompositionError';
  }
}

const orderStatuses = ['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELED'] as const;

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
      include: {
        lines: { include: { product: { select: { id: true, name: true } } } },
        table: true,
      },
    });
    res.json({ orders: rows });
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
      include: { lines: { include: { product: true } }, table: true, staff: true },
    });
    if (!row) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }
    res.json({ order: row });
  }),
);

ordersRouter.patch(
  '/:id/status',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const schema = z.object({
      status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELED']),
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
      const order = await req.tenant.prisma.order.update({
        where: { id: orderId },
        data: { status: parsed.data.status as OrderStatus },
        include: { lines: { include: { product: true } } },
      });
      res.json({ order });
    } catch {
      sendError(res, 404, 'not_found', 'Order not found');
    }
  }),
);
