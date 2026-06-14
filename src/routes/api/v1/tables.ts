import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '../../../db/tenant-client';
import type { RestaurantTable, TableZone } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { denyChef } from '../../../middleware/requireRole';
import { generatePublicId, tenantEntityIdSchema } from '../../../services/publicId';
import { broadcastStaffRealtime } from '../../../realtime/broadcastStaffRealtime';

const tableInclude = { zone: true } as const;

type RestaurantTablePayload = RestaurantTable & {
  zone: TableZone;
};

export const tablesRouter = Router();
tablesRouter.use(requireStaff);
tablesRouter.use(denyChef);

/** Interprets P2002 from partial unique `(zone_id, table_number)` or legacy global `table_number` index. */
function sendTableUniqueConflict(res: Parameters<typeof sendError>[0], e: Prisma.PrismaClientKnownRequestError) {
  const raw = e.meta?.target;
  const fields: string[] = Array.isArray(raw)
    ? raw.map(String)
    : typeof raw === 'string'
      ? [raw]
      : [];
  const legacyGlobalNumber = fields.length === 1 && fields[0] === 'table_number';
  if (fields.length === 0) {
    sendError(
      res,
      409,
      'table_number_conflict',
      'This table number conflicts with an existing row. Run the latest tenant migrations (per-zone + active-only uniqueness), or remove/change the other table.',
    );
    return;
  }
  if (legacyGlobalNumber) {
    sendError(
      res,
      409,
      'table_number_unique_legacy_or_conflict',
      'This table number cannot be created: the database still enforces a single global table number, or another row uses it. Run tenant migrations (`npm run prisma:migrate:tenant`) so numbers are unique per zone only, or remove/reactivate the conflicting table.',
      { fields },
    );
    return;
  }
  sendError(
    res,
    409,
    'table_number_taken_in_zone',
    'Another active table in this zone already uses this table number. Remove the duplicate or deactivate the old row.',
    { fields },
  );
}

function tableJson(t: RestaurantTablePayload): Record<string, unknown> {
  const { id, zone, ...rest } = t;
  return {
    id,
    ...rest,
    zone,
  };
}

tablesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const rows = await req.tenant.prisma.restaurantTable.findMany({
      where: { isActive: true },
      include: tableInclude,
      orderBy: [{ zone: { sortOrder: 'asc' } }, { zone: { name: 'asc' } }, { tableNumber: 'asc' }, { sortOrder: 'asc' }],
    });
    res.json({ tables: rows.map(tableJson) });
  }),
);

const tableBody = z.object({
  tableNumber: z.number().int().min(1),
  zoneId: tenantEntityIdSchema,
  seatCount: z.number().int().min(1).max(999).optional(),
  sortOrder: z.number().int().optional(),
});

const tablePatchBody = tableBody.partial().extend({
  zoneId: tenantEntityIdSchema.optional(),
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
      const prisma = req.tenant.prisma;
      const conflict = await prisma.restaurantTable.findFirst({
        where: {
          zoneId: parsed.data.zoneId,
          tableNumber: parsed.data.tableNumber,
          isActive: true,
        },
        select: { id: true },
      });
      if (conflict) {
        sendError(
          res,
          409,
          'table_number_taken_in_zone',
          'An active table with this number already exists in this zone.',
        );
        return;
      }

      const t = await prisma.restaurantTable.create({
        data: {
          id: generatePublicId(),
          tableNumber: parsed.data.tableNumber,
          zoneId: parsed.data.zoneId,
          seatCount: parsed.data.seatCount ?? 4,
          sortOrder: parsed.data.sortOrder ?? 0,
        },
        include: tableInclude,
      });
      res.status(201).json({ table: tableJson(t) });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        sendTableUniqueConflict(res, e);
        return;
      }
      throw e;
    }
  }),
);

tablesRouter.post(
  '/:id/toggle-status',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing table id');
      return;
    }
    try {
      const existing = await req.tenant.prisma.restaurantTable.findUnique({
        where: { id },
        select: { status: true },
      });
      if (!existing) {
        sendError(res, 404, 'not_found', 'Table not found');
        return;
      }
      const nextStatus = existing.status === 'free' ? 'occupied' : 'free';
      const table = await req.tenant.prisma.restaurantTable.update({
        where: { id },
        include: tableInclude,
        data: { status: nextStatus },
      });
      res.json({ table: tableJson(table), status: table.status });
      broadcastStaffRealtime(req.tenant.id, {
        v: 1,
        type: 'table.updated',
        tableId: id,
        status: table.status,
        ts: new Date().toISOString(),
      });
    } catch {
      sendError(res, 404, 'not_found', 'Table not found');
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
      const prisma = req.tenant.prisma;
      const existingRow = await prisma.restaurantTable.findUnique({
        where: { id },
        select: { zoneId: true, tableNumber: true },
      });
      if (!existingRow) {
        sendError(res, 404, 'not_found', 'Table not found');
        return;
      }

      const nextZoneId =
        'zoneId' in parsed.data && parsed.data.zoneId !== undefined
          ? parsed.data.zoneId
          : existingRow.zoneId;
      const nextTableNumber =
        'tableNumber' in parsed.data && parsed.data.tableNumber !== undefined
          ? parsed.data.tableNumber
          : existingRow.tableNumber;

      if (
        ('zoneId' in parsed.data && parsed.data.zoneId !== undefined) ||
        ('tableNumber' in parsed.data && parsed.data.tableNumber !== undefined)
      ) {
        const conflict = await prisma.restaurantTable.findFirst({
          where: {
            zoneId: nextZoneId,
            tableNumber: nextTableNumber,
            isActive: true,
            NOT: { id },
          },
          select: { id: true },
        });
        if (conflict) {
          sendError(
            res,
            409,
            'table_number_taken_in_zone',
            'Another active table in this zone already uses this table number.',
          );
          return;
        }
      }

      const table = await prisma.restaurantTable.update({
        where: { id },
        include: tableInclude,
        data: {
          ...('tableNumber' in parsed.data && parsed.data.tableNumber !== undefined
            ? { tableNumber: parsed.data.tableNumber }
            : {}),
          ...('zoneId' in parsed.data ? { zoneId: parsed.data.zoneId } : {}),
          ...('seatCount' in parsed.data && parsed.data.seatCount !== undefined
            ? { seatCount: parsed.data.seatCount }
            : {}),
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
        sendTableUniqueConflict(res, e);
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
