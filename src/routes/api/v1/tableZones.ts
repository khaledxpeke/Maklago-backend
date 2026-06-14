import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '../../../db/tenant-client';
import type { TableZone } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { denyChef } from '../../../middleware/requireRole';
import { generatePublicId } from '../../../services/publicId';

export const tableZonesRouter = Router();
tableZonesRouter.use(requireStaff);
tableZonesRouter.use(denyChef);

function zoneJson(zn: TableZone): Record<string, unknown> {
  const { id, ...rest } = zn;
  return { id, ...rest };
}

tableZonesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const rows = await req.tenant.prisma.tableZone.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json({ zones: rows.map(zoneJson) });
  }),
);

const zoneBody = z.object({
  name: z.string().min(1).max(100).trim(),
  sortOrder: z.number().int().optional(),
});

const zonePatchBody = zoneBody.partial();

tableZonesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = zoneBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    try {
      const zn = await req.tenant.prisma.tableZone.create({
        data: {
          id: generatePublicId(),
          name: parsed.data.name,
          sortOrder: parsed.data.sortOrder ?? 0,
        },
      });
      res.status(201).json({ zone: zoneJson(zn) });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        sendError(res, 409, 'zone_name_taken', 'A zone with this name already exists');
        return;
      }
      throw e;
    }
  }),
);

tableZonesRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = zonePatchBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing zone id');
      return;
    }
    try {
      const zn = await req.tenant.prisma.tableZone.update({
        where: { id },
        data: {
          ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
          ...('sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
            ? { sortOrder: parsed.data.sortOrder }
            : {}),
        },
      });
      res.json({ zone: zoneJson(zn) });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        sendError(res, 409, 'zone_name_taken', 'A zone with this name already exists');
        return;
      }
      sendError(res, 404, 'not_found', 'Zone not found');
    }
  }),
);

tableZonesRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing zone id');
      return;
    }
    try {
      await req.tenant.prisma.tableZone.delete({ where: { id } });
      res.status(204).send();
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2003') {
        sendError(res, 409, 'zone_has_tables', 'Move or delete tables in this zone before deleting the zone');
        return;
      }
      sendError(res, 404, 'not_found', 'Zone not found');
    }
  }),
);
