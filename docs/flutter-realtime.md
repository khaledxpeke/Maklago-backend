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

Allowed **`status`** values: `waiting`, `confirmed`, `preparing`, `completed`, `canceled`.

Response includes the enriched **`order`** for HTTP; the server also broadcasts **`order.updated`** over WebSocket (see below).

There is **no** REST route in this API to replace arbitrary line items on an existing order; workflow is create order → status transitions → cancel if needed.

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
| **`table.updated`** | **`tableId`**, **`status`** (`free` \| `occupied`), **`ts`**. |

**`order`** in WebSocket events matches **`serializeOrderSlim`**: money keys **`subtotal`**, **`tva`**, **`total`**; lines under **`products`** with **`categoryId`**, product **`id`**, **`count`**, **`price`**, **`extras`**, optional **`compositionSnapshot`**. For **labeled** lines (product name, extra names, **`extras[].typeId`**), use **`GET /api/v1/mobile/orders`** or **`GET /api/v1/mobile/orders/{id}`** after receiving an event.

## Summary

| Action              | Transport | Endpoint |
|---------------------|-----------|----------|
| Login               | REST      | `POST /api/v1/auth/login` |
| Create order        | REST      | `POST /api/v1/orders` |
| Update order status | REST      | `PATCH /api/v1/orders/{id}/status` |
| Live notifications  | WebSocket | `GET ws(s)://…/api/v1/realtime?token=…` |

OpenAPI: **`GET /openapi.json`** or **`/docs`** on the running server.
