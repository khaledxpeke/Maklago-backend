import { Router } from 'express';
import { asyncHandler } from '../../../http/asyncHandler';
import { requireStaff } from '../../../middleware/requireStaff';
import { getRestaurantSettings } from '../../../services/restaurantSettings';

export const mobileConfigRouter = Router();
mobileConfigRouter.use(requireStaff);

/**
 * Global restaurant config for the mobile app.
 * Returns TVA rate (%), active currency, and open/close times.
 * Call once on app start (or after login) and cache; re-fetch on pull-to-refresh.
 */
mobileConfigRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const s = await getRestaurantSettings(req.tenant.prisma);
    res.json({
      tva: s.tva,
      openTime: s.openTime,
      closeTime: s.closeTime,
      currency: {
        id: s.currency.id,
        code: s.currency.code,
        name: s.currency.name,
        symbol: s.currency.symbol,
      },
    });
  }),
);
