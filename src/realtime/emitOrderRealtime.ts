import type { OrderStatus } from '../db/tenant-client';
import type { SerializableOrder } from '../services/orderJson';
import { serializeOrderSlim } from '../services/orderJson';
import { serializeOrderKitchen } from '../services/orderJsonKitchen';
import type { PrismaClient } from '../db/tenant-client';
import { broadcastStaffRealtime } from './broadcastStaffRealtime';
import type { StaffRealtimeMessageV1 } from './staffRealtimeMessages';

type TableBroadcast = { tableId: string; status: 'free' | 'occupied' };

export async function emitOrderCreatedRealtime(
  tenantId: string,
  prisma: PrismaClient,
  order: SerializableOrder,
  tableBroadcasts?: TableBroadcast[],
): Promise<void> {
  const ts = new Date().toISOString();
  const kitchenOrder = await serializeOrderKitchen(prisma, order);

  const messages: StaffRealtimeMessageV1[] = [
    {
      v: 1,
      type: 'order.created',
      orderId: order.id,
      order: serializeOrderSlim(order),
      ts,
    },
    {
      v: 1,
      type: 'kitchen.order.created',
      orderId: order.id,
      order: kitchenOrder,
      ts,
    },
  ];

  for (const msg of messages) {
    broadcastStaffRealtime(tenantId, msg);
  }

  for (const tb of tableBroadcasts ?? []) {
    broadcastStaffRealtime(tenantId, {
      v: 1,
      type: 'table.updated',
      tableId: tb.tableId,
      status: tb.status,
      ts,
    });
  }
}

export async function emitOrderUpdatedRealtime(
  tenantId: string,
  prisma: PrismaClient,
  order: SerializableOrder,
  tableBroadcasts?: TableBroadcast[],
): Promise<void> {
  const ts = new Date().toISOString();
  const kitchenOrder = await serializeOrderKitchen(prisma, order);

  const messages: StaffRealtimeMessageV1[] = [
    {
      v: 1,
      type: 'order.updated',
      orderId: order.id,
      status: order.status,
      order: serializeOrderSlim(order),
      ts,
    },
    {
      v: 1,
      type: 'kitchen.order.updated',
      orderId: order.id,
      status: order.status,
      order: kitchenOrder,
      ts,
    },
  ];

  for (const msg of messages) {
    broadcastStaffRealtime(tenantId, msg);
  }

  for (const tb of tableBroadcasts ?? []) {
    broadcastStaffRealtime(tenantId, {
      v: 1,
      type: 'table.updated',
      tableId: tb.tableId,
      status: tb.status,
      ts,
    });
  }
}

/** Kitchen-only push when only kitchen-relevant fields changed (optional helper). */
export function emitKitchenOrderUpdated(
  tenantId: string,
  orderId: string,
  status: OrderStatus,
  kitchenOrder: Record<string, unknown>,
): void {
  broadcastStaffRealtime(tenantId, {
    v: 1,
    type: 'kitchen.order.updated',
    orderId,
    status,
    order: kitchenOrder,
    ts: new Date().toISOString(),
  });
}
