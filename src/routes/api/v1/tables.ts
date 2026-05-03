import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '../../../db/tenant-client';
import type { RestaurantTable } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { generatePublicId } from '../../../services/publicId';
import { broadcastStaffRealtime } from '../../../realtime/broadcastStaffRealtime';

export const tablesRouter = Router();
tablesRouter.use(requireStaff);

function tableJson(t: RestaurantTable): Record<string, unknown> {
  const { id, ...rest } = t;
  return { id, ...rest };
}

tablesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const rows = await req.tenant.prisma.restaurantTable.findMany({
      where: { isActive: true },
      orderBy: [{ tableNumber: 'asc' }, { sortOrder: 'asc' }],
    });
    res.json({ tables: rows.map(tableJson) });
  }),
);

const tableBody = z.object({
  name: z.string().min(1).max(100),
  tableNumber: z.number().int().min(1),
  zone: z.string().max(100).nullable().optional(),
  sortOrder: z.number().int().optional(),
});

const tablePatchBody = tableBody.partial().extend({
  status: z.enum(['free', 'occupied']).optional(),
});

tablesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = tableBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    try {
      const t = await req.tenant.prisma.restaurantTable.create({
        data: {
          id: generatePublicId(),
          name: parsed.data.name,
          tableNumber: parsed.data.tableNumber,
          zone: parsed.data.zone ?? undefined,
          sortOrder: parsed.data.sortOrder ?? 0,
        },
      });
      res.status(201).json({ table: tableJson(t) });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        sendError(res, 409, 'table_number_taken', 'Another table already uses this table number');
        return;
      }
      throw e;
    }
  }),
);

tablesRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = tablePatchBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing table id');
      return;
    }
    try {
      const table = await req.tenant.prisma.restaurantTable.update({
        where: { id },
        data: {
          ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
          ...('tableNumber' in parsed.data && parsed.data.tableNumber !== undefined
            ? { tableNumber: parsed.data.tableNumber }
            : {}),
          ...('zone' in parsed.data ? { zone: parsed.data.zone } : {}),
          ...('sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
            ? { sortOrder: parsed.data.sortOrder }
            : {}),
          ...('status' in parsed.data && parsed.data.status !== undefined
            ? { status: parsed.data.status }
            : {}),
        },
      });
      res.json({ table: tableJson(table) });
      if ('status' in parsed.data && parsed.data.status !== undefined && req.tenant) {
        broadcastStaffRealtime(req.tenant.id, {
          v: 1,
          type: 'table.updated',
          tableId: id,
          status: table.status,
          ts: new Date().toISOString(),
        });
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        sendError(res, 409, 'table_number_taken', 'Another table already uses this table number');
        return;
      }
      sendError(res, 404, 'not_found', 'Table not found');
    }
  }),
);

tablesRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing table id');
      return;
    }
    try {
      await req.tenant.prisma.restaurantTable.update({
        where: { id },
        data: { isActive: false },
      });
      res.status(204).send();
    } catch {
      sendError(res, 404, 'not_found', 'Table not found');
    }
  }),
);
