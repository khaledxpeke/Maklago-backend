import type { OrderStatus, PrismaClient } from '../db/tenant-client';

type Db = Pick<PrismaClient, 'order' | 'restaurantTable'>;

/** Dine-in orders that keep a table marked occupied. */
export const TABLE_OCCUPYING_ORDER_STATUSES: OrderStatus[] = ['confirmed', 'preparing'];

/** Keeps `RestaurantTable.status` in sync with confirmed/preparing dine-in orders. */
export async function refreshTableOccupancyFromOrders(
  db: Db,
  tableId: string,
): Promise<'free' | 'occupied'> {
  const openCount = await db.order.count({
    where: {
      tableId,
      orderType: 'dine_in',
      status: { in: TABLE_OCCUPYING_ORDER_STATUSES },
    },
  });
  const status = openCount > 0 ? 'occupied' : ('free' as const);
  await db.restaurantTable.update({
    where: { id: tableId },
    data: { status },
  });
  return status;
}
