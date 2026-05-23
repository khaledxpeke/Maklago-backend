import { Router } from 'express';
import type { OrderStatus } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { logOrderCartUpdated } from '../../../services/activityLog';
import {
  orderDetailInclude,
  serializeOrderMobile,
  serializeOrdersMobile,
} from '../../../services/orderJson';
import {
  OrderNotEditableError,
  OrderNotFoundError,
  replaceOrderCart,
} from '../../../services/orderCart';
import { TABLE_OCCUPYING_ORDER_STATUSES } from '../../../services/tableOccupancy';
import { tenantEntityIdSchema } from '../../../services/publicId';
import { emitOrderUpdatedRealtime } from '../../../realtime/emitOrderRealtime';
import { editOrderSchema, sendOrderCartErrors } from './orders';

/** Same lifecycle filters as `GET /api/v1/orders`. */
const orderStatuses = [
  'waiting',
  'confirmed',
  'preparing',
  'completed',
  'canceled',
] as const;

function sendEditOrderErrors(res: Parameters<typeof sendError>[0], e: unknown): boolean {
  if (sendOrderCartErrors(res, e)) return true;
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
    const tableIdRaw = typeof req.query.tableId === 'string' ? req.query.tableId : undefined;
    const tableIdParsed = tableIdRaw
      ? tenantEntityIdSchema.safeParse(tableIdRaw)
      : null;
    if (tableIdRaw && !tableIdParsed?.success) {
      sendError(res, 400, 'validation_error', 'Invalid tableId');
      return;
    }
    const take = Math.min(100, Math.max(1, Number(req.query.limit ?? 50)));

    const where: {
      status?: OrderStatus;
      tableId?: string;
      orderType?: 'dine_in';
    } = {};
    if (status) where.status = status;
    if (tableIdParsed?.success) {
      where.tableId = tableIdParsed.data;
      where.orderType = 'dine_in';
    }

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

/** Active dine-in ticket on a table (confirmed or preparing). */
mobileOrdersRouter.get(
  '/by-table/:tableId',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const tableId = paramId(req, 'tableId');
    if (!tableId) {
      sendError(res, 400, 'validation_error', 'Missing table id');
      return;
    }
    const row = await req.tenant.prisma.order.findFirst({
      where: {
        tableId,
        orderType: 'dine_in',
        status: { in: TABLE_OCCUPYING_ORDER_STATUSES },
      },
      orderBy: { updatedAt: 'desc' },
      include: orderDetailInclude,
    });
    if (!row) {
      res.json({ order: null });
      return;
    }
    const order = await serializeOrderMobile(req.tenant.prisma, row);
    res.json({ order });
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

/** Replace cart lines (same body as create minus orderType/tableId). Broadcasts **order.updated**. */
mobileOrdersRouter.patch(
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
      const order = await replaceOrderCart(req.tenant.prisma, orderId, parsed.data);
      await emitOrderUpdatedRealtime(req.tenant.id, req.tenant.prisma, order);
      await logOrderCartUpdated(req.tenant.prisma, req.staff!.id, orderId, {
        lineCount: order.lines.length,
        totalCents: order.totalCents,
        paymentReset: hadPaid,
      });
      const mobileOrder = await serializeOrderMobile(req.tenant.prisma, order);
      res.json({ order: mobileOrder });
    } catch (e) {
      if (sendEditOrderErrors(res, e)) return;
      throw e;
    }
  }),
);
