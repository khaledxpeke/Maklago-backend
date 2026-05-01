import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../../http/asyncHandler';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { getDefaultTaxBps, setDefaultTaxBps } from '../../../services/settings';
import { requireRole } from '../../../middleware/requireRole';

export const settingsRouter = Router();
settingsRouter.use(requireStaff);

settingsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const prisma = req.tenant.prisma;
    const rows = await prisma.setting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const defaultTaxBps = await getDefaultTaxBps(prisma);
    res.json({ settings: map, defaultTaxBps });
  }),
);

settingsRouter.patch(
  '/tax',
  requireRole('owner', 'manager'),
  asyncHandler(async (req, res) => {
    const schema = z.object({
      defaultTaxBps: z.number().int().min(0).max(100_000),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    await setDefaultTaxBps(req.tenant.prisma, parsed.data.defaultTaxBps);
    res.json({ defaultTaxBps: parsed.data.defaultTaxBps });
  }),
);
