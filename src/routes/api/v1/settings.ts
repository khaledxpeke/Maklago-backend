import crypto from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../../http/asyncHandler';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { requireRole } from '../../../middleware/requireRole';
import { getDefaultTaxBps, setDefaultTaxBps } from '../../../services/settings';
import { getRestaurantSettings, upsertRestaurantSettings } from '../../../services/restaurantSettings';

const timePattern = /^\d{2}:\d{2}$/;

export const settingsRouter = Router();
settingsRouter.use(requireStaff);

// ─── KV map ──────────────────────────────────────────────────────────────────

settingsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const prisma = req.tenant.prisma;
    const rows = await prisma.setting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const tax = await getDefaultTaxBps(prisma);
    res.json({ settings: map, tax });
  }),
);

// ─── Tax ─────────────────────────────────────────────────────────────────────

settingsRouter.patch(
  '/tax',
  requireRole('owner', 'manager'),
  asyncHandler(async (req, res) => {
    const schema = z.object({
      tax: z.number().int().min(0).max(100_000),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    await setDefaultTaxBps(req.tenant.prisma, parsed.data.tax);
    res.json({ tax: parsed.data.tax });
  }),
);

// ─── Restaurant settings (open/close time + currency) ────────────────────────

settingsRouter.get(
  '/restaurant',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const s = await getRestaurantSettings(req.tenant.prisma);
    res.json({
      openTime: s.openTime,
      closeTime: s.closeTime,
      currency: { id: s.currency.id, code: s.currency.code, name: s.currency.name, symbol: s.currency.symbol },
    });
  }),
);

settingsRouter.patch(
  '/restaurant',
  requireRole('owner', 'manager'),
  asyncHandler(async (req, res) => {
    const schema = z.object({
      openTime: z.string().regex(timePattern, 'Must be HH:mm').optional(),
      closeTime: z.string().regex(timePattern, 'Must be HH:mm').optional(),
      currencyId: z.string().optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const s = await upsertRestaurantSettings(req.tenant.prisma, parsed.data);
    res.json({
      openTime: s.openTime,
      closeTime: s.closeTime,
      currency: { id: s.currency.id, code: s.currency.code, name: s.currency.name, symbol: s.currency.symbol },
    });
  }),
);

// ─── Currencies ───────────────────────────────────────────────────────────────

const currencyCreateSchema = z.object({
  code: z.string().min(1).max(10).toUpperCase(),
  name: z.string().min(1).max(100),
  symbol: z.string().min(1).max(10),
});

const currencyPatchSchema = z.object({
  code: z.string().min(1).max(10).toUpperCase().optional(),
  name: z.string().min(1).max(100).optional(),
  symbol: z.string().min(1).max(10).optional(),
});

settingsRouter.get(
  '/currencies',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const currencies = await req.tenant.prisma.currency.findMany({ orderBy: { code: 'asc' } });
    res.json({ currencies });
  }),
);

settingsRouter.post(
  '/currencies',
  requireRole('owner', 'manager'),
  asyncHandler(async (req, res) => {
    const parsed = currencyCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const existing = await req.tenant.prisma.currency.findUnique({ where: { code: parsed.data.code } });
    if (existing) {
      sendError(res, 409, 'currency_code_taken', 'A currency with this code already exists');
      return;
    }
    const currency = await req.tenant.prisma.currency.create({
      data: { id: crypto.randomBytes(6).toString('hex'), ...parsed.data },
    });
    res.status(201).json({ currency });
  }),
);

settingsRouter.get(
  '/currencies/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = String(req.params.id);
    const currency = await req.tenant.prisma.currency.findUnique({ where: { id } });
    if (!currency) {
      sendError(res, 404, 'not_found', 'Currency not found');
      return;
    }
    res.json({ currency });
  }),
);

settingsRouter.patch(
  '/currencies/:id',
  requireRole('owner', 'manager'),
  asyncHandler(async (req, res) => {
    const parsed = currencyPatchSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant) return;
    const id = String(req.params.id);
    const existing = await req.tenant.prisma.currency.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Currency not found');
      return;
    }
    if (parsed.data.code && parsed.data.code !== existing.code) {
      const conflict = await req.tenant.prisma.currency.findUnique({ where: { code: parsed.data.code } });
      if (conflict) {
        sendError(res, 409, 'currency_code_taken', 'A currency with this code already exists');
        return;
      }
    }
    const currency = await req.tenant.prisma.currency.update({
      where: { id },
      data: parsed.data,
    });
    res.json({ currency });
  }),
);

settingsRouter.delete(
  '/currencies/:id',
  requireRole('owner', 'manager'),
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = String(req.params.id);
    const currency = await req.tenant.prisma.currency.findUnique({ where: { id } });
    if (!currency) {
      sendError(res, 404, 'not_found', 'Currency not found');
      return;
    }
    const activeSetting = await req.tenant.prisma.setting.findUnique({ where: { key: 'currency_id' } });
    if (activeSetting && activeSetting.value === id) {
      sendError(res, 409, 'currency_in_use', 'Cannot delete the active restaurant currency. Change it first in restaurant settings.');
      return;
    }
    await req.tenant.prisma.currency.delete({ where: { id } });
    res.status(204).send();
  }),
);
