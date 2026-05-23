import { Router } from 'express';
import type { OrderStatus } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import {
  kitchenOrderInclude,
  serializeOrderKitchen,
  serializeOrdersKitchen,
} from '../../../services/orderJsonKitchen';
import { TABLE_OCCUPYING_ORDER_STATUSES } from '../../../services/tableOccupancy';

/** Active tickets for kitchen display (same as table-occupying lifecycle). */
const KITCHEN_ORDER_STATUSES: OrderStatus[] = [...TABLE_OCCUPYING_ORDER_STATUSES];

/** Kitchen display API — no prices; includes **`isChanged`** when cart was edited after kitchen last acknowledged. */
export const kitchenOrdersRouter = Router();
kitchenOrdersRouter.use(requireStaff);

kitchenOrdersRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const take = Math.min(100, Math.max(1, Number(req.query.limit ?? 50)));

    const rows = await req.tenant.prisma.order.findMany({
      where: { status: { in: KITCHEN_ORDER_STATUSES } },
      orderBy: [{ status: 'asc' }, { createdAt: 'asc' }],
      take,
      include: kitchenOrderInclude,
    });

    const orders = await serializeOrdersKitchen(req.tenant.prisma, rows);
    res.json({ orders });
  }),
);

kitchenOrdersRouter.get(
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
      include: kitchenOrderInclude,
    });
    if (!row) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }

    const order = await serializeOrderKitchen(req.tenant.prisma, row);
    res.json({ order });
  }),
);

/** Clears **`isChanged`** on kitchen clients by syncing **`kitchenSeenRevision`** to **`cartRevision`**. */
kitchenOrdersRouter.patch(
  '/:id/seen',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }

    const existing = await req.tenant.prisma.order.findUnique({
      where: { id },
      select: { id: true, cartRevision: true },
    });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }

    const updated = await req.tenant.prisma.order.update({
      where: { id },
      data: { kitchenSeenRevision: existing.cartRevision },
      include: kitchenOrderInclude,
    });

    const order = await serializeOrderKitchen(req.tenant.prisma, updated);
    res.json({ order });
  }),
);
