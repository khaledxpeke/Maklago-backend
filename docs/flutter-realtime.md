# Flutter: REST orders + staff WebSocket

The staff realtime channel is **receive-only**. Creating orders, changing status, and editing catalog always use **HTTPS REST** with the staff JWT. The WebSocket pushes **broadcast events** (new orders, status updates, table occupancy) so Flutter can refresh UI without polling.

## Prerequisites

1. **Login** — `POST /api/v1/auth/login` with JSON `{ "email", "password" }`.
   - Optional header **`x-tenant-id`**: tenant slug or registry UUID (omit if the staff email exists in registry **`staff_login_directory`**).
2. From the response, keep **`accessToken`** (staff JWT).

Use **`Authorization: Bearer <accessToken>`** on all protected routes. After login, **`x-tenant-id`** is optional (tenant is taken from the JWT); you may still send it for explicit routing.

Base URL examples: `http://localhost:3000`, `https://api.example.com` (no trailing slash).

## Create an order (REST)

**`POST /api/v1/orders`**

Headers:

- `Authorization: Bearer <accessToken>`
- `Content-Type: application/json`
- Optional: `x-tenant-id: <slug>`

Body (shape must match server pricing; amounts are **integer cents** as in storage — JSON fields use `subtotal`, `tva`, `total`, line `price`, etc.):

- **`orderType`**: `dine_in` | `takeaway` (default `takeaway`).
- **`tableId`**: required for `dine_in`; must be omitted for `takeaway`.
- **`products`**: non-empty array of `{ categoryId, id, count, price, extras? }` per line (`extras`: `{ id, count, price }[]`).
- **`subtotal`**, **`tva`**, **`total`**: must match server recomputation from catalog and tax settings.

See **`CreateOrderRequest`** / OpenAPI (`/openapi.json` or `/docs`) for full validation rules.

On success, **`201`** returns `{ order, printJobs }`. The **`order`** object uses the **slim** serializer (no per-line product `name` on POST response — same family as WebSocket payloads).

## Change order status (REST)

**`PATCH /api/v1/orders/{id}/status`**

Headers: same as above.

Body:

```json
{ "status": "confirmed" }
```

Allowed **`status`** values on **`PATCH …/status`**: `confirmed`, `preparing`, `completed`, `canceled`. Cashier **`POST /orders`** creates orders as **`confirmed`** (dine-in tables become **`occupied`** immediately). Kitchen: **`preparing`** → **`completed`**. Cashier may **`canceled`** from **`confirmed`** or **`preparing`**. **`waiting`** is reserved for a future QR/web flow and cannot be set via this API yet.

There is **no** REST route in this API to replace arbitrary line items on an existing order; workflow is create order → status transitions → cancel if needed.

## Move order to another table (REST)

**`PATCH /api/v1/orders/{id}/table`**

Headers: same as above.

Body:

```json
{ "tableId": "050000000201" }
```

Allowed only for **dine-in** orders in **`confirmed`** or **`preparing`**. The target table must be active and must not already have another confirmed/preparing dine-in order.

On success, the server broadcasts **`order.updated`** (slim order includes new **`tableId`**) and **`table.updated`** for the previous and new tables when occupancy changes.

## Record payment (REST)

**`PATCH /api/v1/orders/{id}/payment`**

Headers: same as above.

Body (either field name works):

```json
{ "paymentMethod": "cash" }
```

```json
{ "paymentType": "card" }
```

Allowed values: **`cash`**, **`card`**. The order id is the path parameter `{id}`. Cannot pay a **canceled** order. Response includes enriched **`order`** with **`paymentMethod`** set; **`order.updated`** is broadcast on the WebSocket.

## Edit order cart (REST, mobile)

**`PATCH /api/v1/mobile/orders/{id}`** (preferred on handset — response uses mobile line labels)

Same body shape as **`POST /orders`**, minus `orderType` / `tableId`:

```json
{
  "products": [
    { "categoryId": "010000000001", "id": "020000000101", "count": 2, "price": 2.5, "extras": [] }
  ],
  "subtotal": 5.0,
  "tva": 0.5,
  "total": 5.5,
  "note": "No ice",
  "discount": 0
}
```

Allowed while status is **`confirmed`** or **`preparing`**. Replaces all lines server-side (same total validation as create). If the order was already paid (**cash** / **card**), payment resets to **`unpaid`** so the cashier can charge again. Broadcasts **`order.updated`** — other devices (kitchen, another tablet on the same table) refresh via WebSocket; no separate WS write from the client.

**Load order when user taps a table:**

```http
GET /api/v1/mobile/orders/by-table/{tableId}
```

Returns `{ "order": null }` or `{ "order": { ... } }` for the active dine-in ticket (**confirmed** / **preparing**).

Backoffice / generic: **`PATCH /api/v1/orders/{id}`** (same body, enriched **`order`** in response).

## Kitchen display (REST)

**`GET /api/v1/kitchen/orders`** — active tickets (**`confirmed`**, **`preparing`**), no prices.

**`GET /api/v1/kitchen/orders/{id}`** — one ticket.

**`PATCH /api/v1/kitchen/orders/{id}/seen`** — clears **`isChanged`** (kitchen acknowledged current cart).

Example kitchen **`order`**:

```json
{
  "id": "…",
  "commandNumber": 12,
  "status": "confirmed",
  "orderType": "takeaway",
  "note": "No ice",
  "isChanged": true,
  "cartRevision": 1,
  "products": [
    {
      "id": "020000000101",
      "name": "Sandwich escalope",
      "count": 2,
      "extras": [{ "id": "…", "name": "Sauce", "count": 1, "typeId": "…" }]
    }
  ]
}
```

On cart edit (**`PATCH /mobile/orders/{id}`**), **`cartRevision`** increments and **`isChanged`** becomes **`true`** until **`seen`**. WebSocket **`kitchen.order.updated`** carries the full kitchen payload.

## Connect WebSocket (Flutter)

Staff channel URL (query JWT — prefer **`wss://`** in production; tokens in query strings can appear in logs):

```text
ws://<host>:<port>/api/v1/realtime?token=<accessToken>
```

If the API uses HTTPS, use **`wss://`** and the same host/port (or your reverse proxy path).

Example with `web_socket_channel`:

```dart
import 'package:web_socket_channel/web_socket_channel.dart';

final base = 'http://localhost:3000'; // your API origin
final uri = Uri.parse(base);
final wsScheme = uri.scheme == 'https' ? 'wss' : 'ws';
final wsUrl = Uri(
  scheme: wsScheme,
  host: uri.host,
  port: uri.hasPort ? uri.port : null,
  path: '/api/v1/realtime',
  queryParameters: {'token': accessToken},
);

final channel = WebSocketChannel.connect(wsUrl);

channel.stream.listen((message) {
  final json = jsonDecode(message as String) as Map<String, dynamic>;
  final v = json['v'];
  final type = json['type'] as String?;
  if (v != 1) return;
  switch (type) {
    case 'connected':
      // json['tenantId']
      break;
    case 'order.created':
      // json['orderId'], json['order'] (slim order map), json['ts']
      break;
    case 'order.updated':
      // json['orderId'], json['status'], json['order'], json['ts']
      break;
    case 'table.updated':
      // json['tableId'], json['status'] — 'free' | 'occupied', json['ts']
      break;
  }
});
```

Reconnect with a **fresh JWT** when the socket closes with auth errors (`401` during upgrade).

## WebSocket message protocol (**v1**)

Every message is a JSON object with **`v`: 1**.

| `type`           | Fields |
|------------------|--------|
| **`connected`**  | **`tenantId`** — registry tenant id for this socket. |
| **`order.created`** | **`orderId`**, **`order`** (slim order JSON), **`ts`** (ISO-8601). |
| **`order.updated`** | **`orderId`**, **`status`**, full slim **`order`**, **`ts`**. |
| **`kitchen.order.created`** | **`orderId`**, **`order`** (kitchen JSON — no prices), **`ts`**. Same socket as cashier. |
| **`kitchen.order.updated`** | **`orderId`**, **`status`**, kitchen **`order`**, **`ts`**. Fired on create, cart edit, status change, table move. |
| **`table.updated`** | **`tableId`**, **`status`** (`free` \| `occupied`), **`ts`**. Dine-in tables are **`occupied`** while the order is **`confirmed`** or **`preparing`**. |

**Kitchen app:** listen for **`kitchen.order.*`** (or load **`GET /api/v1/kitchen/orders`** on any **`order.*`** event). Kitchen **`order`** has **`products[].name`**, **`count`**, **`extras[].name`**, no **`price`** / totals / payment. **`isChanged`**: `true` when the cashier edited the cart since the kitchen last acknowledged (**`PATCH /api/v1/kitchen/orders/{id}/seen`**). **`cartRevision`** increments on each cart replace.

**Cashier **`order`** in WebSocket events matches **`serializeOrderSlim`**: money keys **`subtotal`**, **`tva`**, **`total`**; lines under **`products`** with **`categoryId`**, product **`id`**, **`count`**, **`price`**, **`extras`**, optional **`compositionSnapshot`**. For **labeled** lines (product name, extra names, **`extras[].typeId`**), use **`GET /api/v1/mobile/orders`** or **`GET /api/v1/mobile/orders/{id}`** after receiving an event.

## Summary

| Action              | Transport | Endpoint |
|---------------------|-----------|----------|
| Login               | REST      | `POST /api/v1/auth/login` |
| Create order        | REST      | `POST /api/v1/orders` |
| Update order status | REST      | `PATCH /api/v1/orders/{id}/status` |
| Record payment      | REST      | `PATCH /api/v1/orders/{id}/payment` |
| Edit order cart     | REST      | `PATCH /api/v1/mobile/orders/{id}` |
| Order on table      | REST      | `GET /api/v1/mobile/orders/by-table/{tableId}` |
| Move dine-in table  | REST      | `PATCH /api/v1/orders/{id}/table` |
| Kitchen ticket list | REST      | `GET /api/v1/kitchen/orders` |
| Kitchen acknowledge | REST      | `PATCH /api/v1/kitchen/orders/{id}/seen` |
| Live notifications  | WebSocket | `GET ws(s)://…/api/v1/realtime?token=…` |

OpenAPI: **`GET /openapi.json`** or **`/docs`** on the running server.
