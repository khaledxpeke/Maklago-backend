import type { OrderStatus } from '../db/tenant-client';

/**
 * Full order JSON from `serializeOrderSlim` — POST-aligned money keys (`subtotal`, `tva`, `total`) in major currency units; line items carry identities (`categoryId`, product `id`), `count`, `price`, `extras` (plus optional `compositionSnapshot`). Per-line TVA is omitted.
 * **`GET /api/v1/mobile/orders`** uses `serializeOrdersMobile` (slimmer shell: no `staff` / nested `table`; root `tableId` + `tableNumber` for dine-in; enriched line extras).
 * `tableId` / `table` omitted for takeaway or missing table assignment.
 */
export type SerializedOrderJson = Record<string, unknown>;

/** Protocol version for cashier / kitchen realtime channel (`/api/v1/realtime`). */
export type StaffRealtimeMessageV1 =
  | {
      v: 1;
      type: 'connected';
      tenantId: string;
    }
  | {
      v: 1;
      type: 'order.created';
      orderId: string;
      order: SerializedOrderJson;
      ts: string;
    }
  | {
      v: 1;
      type: 'order.updated';
      orderId: string;
      status: OrderStatus;
      order: SerializedOrderJson;
      ts: string;
    }
  | {
      v: 1;
      type: 'kitchen.order.created';
      orderId: string;
      /** No prices — product names, counts, extras, **`isChanged`**, **`cartRevision`**. */
      order: SerializedOrderJson;
      ts: string;
    }
  | {
      v: 1;
      type: 'kitchen.order.updated';
      orderId: string;
      status: OrderStatus;
      order: SerializedOrderJson;
      ts: string;
    }
  | {
      v: 1;
      type: 'table.updated';
      tableId: string;
      status: 'free' | 'occupied';
      ts: string;
    }
  | {
      v: 1;
      type: 'chef.init';
      /** All orders from session open_time → now, kitchen format (no prices). */
      orders: SerializedOrderJson[];
      ts: string;
    };
