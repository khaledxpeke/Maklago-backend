import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';

export const tablesRouter = Router();
tablesRouter.use(requireStaff);

tablesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const rows = await req.tenant.prisma.restaurantTable.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json({ tables: rows });
  }),
);

const tableBody = z.object({
  name: z.string().min(1).max(100),
  zone: z.string().max(100).nullable().optional(),
  sortOrder: z.number().int().optional(),
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
    const t = await req.tenant.prisma.restaurantTable.create({
      data: {
        name: parsed.data.name,
        zone: parsed.data.zone ?? undefined,
        sortOrder: parsed.data.sortOrder ?? 0,
      },
    });
    res.status(201).json({ table: t });
  }),
);

tablesRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = tableBody.partial().safeParse(req.body);
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
          ...('zone' in parsed.data ? { zone: parsed.data.zone } : {}),
          ...('sortOrder' in parsed.data && parsed.data.sortOrder !== undefined
            ? { sortOrder: parsed.data.sortOrder }
            : {}),
        },
      });
      res.json({ table });
    } catch {
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
