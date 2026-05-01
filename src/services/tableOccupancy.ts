import type { PrismaClient } from '../db/tenant-client';

type Db = Pick<PrismaClient, 'order' | 'restaurantTable'>;

/** Keeps `RestaurantTable.status` in sync with open dine-in orders (draft/active). */
export async function refreshTableOccupancyFromOrders(db: Db, tableId: string): Promise<void> {
  const openCount = await db.order.count({
    where: {
      tableId,
      fulfillment: 'dine_in',
      status: { in: ['draft', 'active'] },
    },
  });
  await db.restaurantTable.update({
    where: { id: tableId },
    data: { status: openCount > 0 ? 'occupied' : 'free' },
  });
}
