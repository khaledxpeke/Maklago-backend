import { Router } from 'express';
import type { OrderStatus } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import {
  orderDetailInclude,
  serializeOrderMobile,
  serializeOrdersMobile,
} from '../../../services/orderJson';

/** Same lifecycle filters as `GET /api/v1/orders`. */
const orderStatuses = [
  'waiting',
  'confirmed',
  'preparing',
  'completed',
  'canceled',
] as const;

/** Mobile lists omit **`staff`** and nested **`table`**; dine-in adds root **`tableId`** + **`tableNumber`**. Lines add **`name`**, **`extras[].name`**, **`extras[].typeId`**. */
export const mobileOrdersRouter = Router();
mobileOrdersRouter.use(requireStaff);

mobileOrdersRouter.get(
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
    const orders = await serializeOrdersMobile(req.tenant.prisma, rows);
    res.json({ orders });
  }),
);

mobileOrdersRouter.get(
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
      include: orderDetailInclude,
    });
    if (!row) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }
    const order = await serializeOrderMobile(req.tenant.prisma, row);
    res.json({ order });
  }),
);
