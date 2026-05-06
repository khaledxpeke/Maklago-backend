import { Router } from 'express';
import type { RestaurantTable, TableZone } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { requireStaff } from '../../../middleware/requireStaff';

/** Table row nested under a zone (no **`zone`** / **`zoneId`** — implied by parent). */
function tableInZoneJson(t: RestaurantTable): Record<string, unknown> {
  return {
    id: t.id,
    tableNumber: t.tableNumber,
    seatCount: t.seatCount,
    sortOrder: t.sortOrder,
    status: t.status,
    createdAt: t.createdAt,
  };
}

function zoneWithTablesJson(zn: TableZone & { tables: RestaurantTable[] }): Record<string, unknown> {
  return {
    id: zn.id,
    name: zn.name,
    sortOrder: zn.sortOrder,
    createdAt: zn.createdAt,
    tables: zn.tables.map(tableInZoneJson),
  };
}

export const mobileZonesRouter = Router();
mobileZonesRouter.use(requireStaff);

/** Zones with active tables nested (same ordering as **`GET /tables`**). */
mobileZonesRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const rows = await req.tenant.prisma.tableZone.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: {
        tables: {
          where: { isActive: true },
          orderBy: [{ tableNumber: 'asc' }, { sortOrder: 'asc' }],
        },
      },
    });
    res.json({ zones: rows.map(zoneWithTablesJson) });
  }),
);
