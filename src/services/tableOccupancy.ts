import type { OrderStatus, PrismaClient } from '../db/tenant-client';

type Db = Pick<PrismaClient, 'order' | 'restaurantTable'>;

const OPEN_ORDER_STATUSES: OrderStatus[] = ['waiting', 'confirmed', 'preparing'];

/** Keeps `RestaurantTable.status` in sync with open dine-in orders (kitchen lifecycle). */
export async function refreshTableOccupancyFromOrders(
  db: Db,
  tableId: string,
): Promise<'free' | 'occupied'> {
  const openCount = await db.order.count({
    where: {
      tableId,
      orderType: 'dine_in',
      status: { in: OPEN_ORDER_STATUSES },
    },
  });
  const status = openCount > 0 ? 'occupied' : ('free' as const);
  await db.restaurantTable.update({
    where: { id: tableId },
    data: { status },
  });
  return status;
}
