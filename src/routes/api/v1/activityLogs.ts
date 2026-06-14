import { Router } from 'express';
import { z } from 'zod';
import type { ActivityAction, ActivityEntityType } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { denyChef } from '../../../middleware/requireRole';
import { activityLogToJson, listActivityLogs } from '../../../services/activityLog';
import { tenantEntityIdSchema } from '../../../services/publicId';

const entityTypes = ['order'] as const;
const actions = [
  'order_created',
  'order_updated',
  'order_status_changed',
  'order_payment_recorded',
  'order_table_changed',
] as const;

export const activityLogsRouter = Router();
activityLogsRouter.use(requireStaff);
activityLogsRouter.use(denyChef);

activityLogsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;

    const entityTypeRaw = typeof req.query.entityType === 'string' ? req.query.entityType : undefined;
    const entityIdRaw = typeof req.query.entityId === 'string' ? req.query.entityId : undefined;
    const actionRaw = typeof req.query.action === 'string' ? req.query.action : undefined;
    const take = Math.min(200, Math.max(1, Number(req.query.limit ?? 50)));

    if (entityTypeRaw && !entityTypes.includes(entityTypeRaw as (typeof entityTypes)[number])) {
      sendError(res, 400, 'validation_error', 'Invalid entityType');
      return;
    }
    if (actionRaw && !actions.includes(actionRaw as (typeof actions)[number])) {
      sendError(res, 400, 'validation_error', 'Invalid action');
      return;
    }
    if (entityIdRaw && !tenantEntityIdSchema.safeParse(entityIdRaw).success) {
      sendError(res, 400, 'validation_error', 'Invalid entityId');
      return;
    }

    const rows = await listActivityLogs(req.tenant.prisma, {
      entityType: entityTypeRaw as ActivityEntityType | undefined,
      entityId: entityIdRaw,
      action: actionRaw as ActivityAction | undefined,
      take,
    });

    res.json({ logs: rows.map(activityLogToJson) });
  }),
);

/** Convenience: activity for one order (same rows as `?entityType=order&entityId=`). */
activityLogsRouter.get(
  '/orders/:orderId',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const orderId = paramId(req, 'orderId');
    if (!orderId) {
      sendError(res, 400, 'validation_error', 'Missing order id');
      return;
    }
    if (!tenantEntityIdSchema.safeParse(orderId).success) {
      sendError(res, 400, 'validation_error', 'Invalid order id');
      return;
    }

    const actionRaw = typeof req.query.action === 'string' ? req.query.action : undefined;
    if (actionRaw && !actions.includes(actionRaw as (typeof actions)[number])) {
      sendError(res, 400, 'validation_error', 'Invalid action');
      return;
    }

    const take = Math.min(200, Math.max(1, Number(req.query.limit ?? 50)));
    const order = await req.tenant.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true },
    });
    if (!order) {
      sendError(res, 404, 'not_found', 'Order not found');
      return;
    }

    const rows = await listActivityLogs(req.tenant.prisma, {
      entityType: 'order',
      entityId: orderId,
      action: actionRaw as ActivityAction | undefined,
      take,
    });

    res.json({ logs: rows.map(activityLogToJson) });
  }),
);
