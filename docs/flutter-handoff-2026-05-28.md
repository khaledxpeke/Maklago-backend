# Flutter handoff — API updates (28 May 2026)

Summary for mobile app integration. Full spec: **`GET /openapi.json`** or **`/docs`** on the running server. Existing guide: [`flutter-realtime.md`](./flutter-realtime.md).

---

## ⚠️ Priority — Tables tab WebSocket (must implement)

The **Tables** tab must **not** poll `GET /tables` on a timer. The backend already pushes live updates on the staff WebSocket. Without this, cashiers must manually refresh when another device creates an order, edits a cart, completes a ticket, or moves a table.

**Required behaviour:**
1. Connect WebSocket **once after login** (keep alive across Orders / New order / Tables tabs).
2. On **Tables tab open**: `GET /api/v1/tables` once → render floor plan.
3. On **`table.updated`**: patch that table’s `status` (`free` | `occupied`) in local state → UI updates instantly.
4. On **table tap**: `GET /api/v1/mobile/orders/by-table/{tableId}` → show order sheet.
5. While order sheet is open: on **`order.updated`** for that order (or **`table.updated`** if table changed) → refetch detail or merge from event.

See **§2** below for full protocol, triggers, and Dart example.

---

## Global request headers (every API call)

| Header | Required | Values | Notes |
|--------|----------|--------|-------|
| `Authorization` | Yes (protected routes) | `Bearer <accessToken>` | From login |
| `x-tenant-id` | Optional after login | Tenant slug or UUID | Omit if JWT already scoped |
| **`lang`** | **Recommended** | `fr` (default), `en`, `ar` | Error messages follow this language |
| `Content-Type` | POST/PATCH bodies | `application/json` | |

Response includes **`Content-Language: fr`** (or resolved lang).

---

## Money format (unchanged reminder)

All JSON amounts are **major currency units as decimals** (e.g. `2.5`, `41`, `45.1`) — **not** integer cents.

- Create order: `"paymentMethod": "unpaid"` only
- Pay later: `PATCH /api/v1/orders/{id}/payment` with `"paymentMethod": "cash" | "card"`

---

## 1. Staff PIN (owner sets, staff toggles gate)

### Owner (backoffice only)
- `PUT /api/v1/staff/{staffId}/pin` — body `{ "pin": "1234" }` — manager/cashier (or self)
- `DELETE /api/v1/staff/{staffId}/pin` — remove PIN

### All staff (mobile settings)
From login / `GET /api/v1/auth/me`:

| Field | Meaning |
|-------|---------|
| `hasPin` | Owner configured a 4-digit PIN on this account |
| `requiresMobilePin` | App should prompt for PIN on gated flows **right now** |

**Toggle gate (does not change PIN digits):**

```http
PATCH /api/v1/auth/me/pin-mobile-enabled
{ "pinMobileEnabled": true }
```

Turn **off** while PIN exists:

```http
PATCH /api/v1/auth/me/pin-mobile-enabled
{ "pinMobileEnabled": false, "currentPin": "1234" }
```

**Verify PIN:**

```http
POST /api/v1/auth/verify-pin
{ "pin": "1234" }
→ { "verified": true }
```

**Flutter UX:** Show PIN switch when `hasPin === true`. When `requiresMobilePin === true`, show PIN screen before sensitive actions. Staff cannot change PIN value — only owner in backoffice.

### Change password (all staff, own account)

```http
PATCH /api/v1/auth/me/password
{
  "currentPassword": "old-secret",
  "newPassword": "new-secret8",
  "confirmPassword": "new-secret8"
}
→ { "ok": true }
```

| Error code | When |
|------------|------|
| `validation_error` | Body invalid or `newPassword` ≠ `confirmPassword` |
| `invalid_current_password` | Wrong current password (401) |
| `password_unchanged` | New password same as current (400) |

Min **8** characters for new password. JWT stays valid after change (no forced re-login unless the app chooses to).

---

## 2. Tables tab — WebSocket live updates (REQUIRED)

> **Backend is done.** Flutter must connect and handle events. No polling on the Tables screen.

### Architecture

```
Login → open WebSocket (app-wide, single connection)
         │
         ├─ Tables tab opened → GET /tables (once) → show grid
         │
         ├─ table.updated  → update tables[tableId].status in memory
         ├─ order.created  → if dine_in: table becomes occupied (table.updated also sent)
         └─ order.updated  → if user viewing that order/table → refresh detail panel

User taps table → GET /mobile/orders/by-table/{tableId} → show ticket
```

### WebSocket URL

```text
ws://<host>/api/v1/realtime?token=<accessToken>
```
Use **`wss://`** when API is HTTPS. Pass staff JWT from login (`accessToken`). Reconnect with fresh token on auth failure.

### Message format (protocol v1)

Every message is JSON with **`"v": 1`**. Ignore unknown `type` values.

#### `connected` (first message after connect)

```json
{ "v": 1, "type": "connected", "tenantId": "uuid-of-tenant" }
```

#### `table.updated` — **primary event for Tables grid**

```json
{
  "v": 1,
  "type": "table.updated",
  "tableId": "0a1b2c3d4e5f",
  "status": "occupied",
  "ts": "2026-05-28T14:30:00.000Z"
}
```

- **`status`**: `"free"` | `"occupied"`
- Table is **`occupied`** while it has a dine-in order in **`confirmed`** or **`preparing`**
- Table goes **`free`** when order → **`completed`** or **`canceled`**

**Flutter:** `tables[tableId] = tables[tableId].copyWith(status: status)` → rebuild grid tile colour/badge.

#### `order.created` — new ticket (any device)

```json
{
  "v": 1,
  "type": "order.created",
  "orderId": "...",
  "order": {
    "id": "...",
    "reference": "a1b2c3d4",
    "commandNumber": 42,
    "status": "confirmed",
    "orderType": "dine_in",
    "tableId": "0a1b2c3d4e5f",
    "table": { "id": "...", "tableNumber": 5, "status": "occupied" },
    "subtotal": 20.5,
    "tva": 2.05,
    "total": 22.55,
    "products": [ ... ]
  },
  "ts": "..."
}
```

- For **dine-in**, you also get **`table.updated`** → prefer patching from `table.updated` for the grid (simpler).
- **`order`** is **slim** (no product `name` on lines) — use for badges/counts only, not the detail sheet.

#### `order.updated` — cart edit, payment, status, table move

```json
{
  "v": 1,
  "type": "order.updated",
  "orderId": "...",
  "status": "preparing",
  "order": { "... slim order, includes tableId if dine_in ..." },
  "ts": "..."
}
```

**When server sends this (cashier-relevant):**

| REST action | Tables grid | Open order sheet |
|-------------|-------------|------------------|
| `POST /orders` (dine-in) | `table.updated` → occupied | N/A |
| `PATCH /mobile/orders/{id}` (cart edit) | unchanged table | **Refresh detail** |
| `PATCH /orders/{id}/status` → completed | `table.updated` → free | Close or show completed |
| `PATCH /orders/{id}/table` (move) | **Two** `table.updated` (old free, new occupied) | Follow new `tableId` or close |
| `PATCH /orders/{id}/payment` | unchanged | Optional refresh totals |

**Flutter detail sheet:** on `order.updated` where `orderId == selectedOrderId` (or `order.tableId == selectedTableId`):

```dart
// Option A (recommended): refetch full labels
final detail = await api.get('/api/v1/mobile/orders/$orderId');

// Option B: merge slim fields from WS if you already have names cached
```

Also listen for **`kitchen.order.updated`** on the **same socket** if you build kitchen UI — cashier Tables tab can ignore it.

### REST endpoints (Tables tab)

**Initial floor plan (once per tab visit or on pull-to-refresh only):**

```http
GET /api/v1/tables
→ { "tables": [ { "id", "tableNumber", "status", "zone", "seatCount", ... } ] }
```

**Tap occupied table — load ticket with product names:**

```http
GET /api/v1/mobile/orders/by-table/{tableId}
→ { "order": null }                    // table free / no active ticket
→ { "order": { ... full mobile order } } // confirmed or preparing
```

**Single order (after WS hint or from list):**

```http
GET /api/v1/mobile/orders/{orderId}
```

### Dart — minimal realtime service

```dart
class StaffRealtimeService {
  WebSocketChannel? _channel;
  final _events = StreamController<Map<String, dynamic>>.broadcast();

  Stream<Map<String, dynamic>> get events => _events.stream;

  void connect(String apiBase, String accessToken) {
    final uri = Uri.parse(apiBase);
    final ws = Uri(
      scheme: uri.scheme == 'https' ? 'wss' : 'ws',
      host: uri.host,
      port: uri.hasPort ? uri.port : null,
      path: '/api/v1/realtime',
      queryParameters: {'token': accessToken},
    );
    _channel = WebSocketChannel.connect(ws);
    _channel!.stream.listen((raw) {
      final msg = jsonDecode(raw as String) as Map<String, dynamic>;
      if (msg['v'] != 1) return;
      _events.add(msg);
    });
  }

  void dispose() => _channel?.sink.close();
}

// In TablesController / Cubit:
void _onRealtime(Map<String, dynamic> msg) {
  switch (msg['type']) {
    case 'table.updated':
      final tableId = msg['tableId'] as String;
      final status = msg['status'] as String;
      emit(state.copyWithTableStatus(tableId, status));
      break;
    case 'order.updated':
      final orderId = msg['orderId'] as String;
      final order = msg['order'] as Map<String, dynamic>?;
      final tableId = order?['tableId'] as String?;
      if (state.selectedTableId == tableId || state.selectedOrderId == orderId) {
        refetchOrderDetail(orderId);
      }
      break;
    case 'order.created':
      // Grid updates via table.updated; optional toast for new ticket
      break;
  }
}
```

### What NOT to do

- ❌ `Timer.periodic` calling `GET /tables` every N seconds
- ❌ Separate WebSocket per tab — use **one** connection for the app session
- ❌ Rely on WS `order` payload alone for the detail UI (missing product **names**) — refetch `GET /mobile/orders/{id}` or use cached names from first load

### Occupancy rules (for UI logic)

| Order status | Table status |
|--------------|--------------|
| `confirmed` | `occupied` |
| `preparing` | `occupied` |
| `completed` | `free` |
| `canceled` | `free` |

Takeaway orders do **not** affect table occupancy.

More detail: [`flutter-realtime.md`](./flutter-realtime.md) § Connect WebSocket + protocol table.

---

## 3. Order history — paginated list

**`GET /api/v1/mobile/orders`** — replaces flat `limit=50` with pagination + filters (Tacos-style history).

### Query params

| Param | Default | Description |
|-------|---------|-------------|
| `page` | `1` | Page number (1-based) |
| `limit` | `10` | Page size (max 100) |
| `filter` | `all` | `all`, `today`, `week`, `month`, `custom` |
| `startDate` / `endDate` | — | `YYYY-MM-DD` with `filter=custom` |
| `status` | — | `confirmed`, `preparing`, `completed`, `canceled`, … |
| `orderType` | — | `dine_in` \| `takeaway` |
| `tableId` | — | Dine-in orders for one table |
| `search` | — | Ticket #, reference, or customer name |

**Timezone:** all date filters use **`Africa/Tunis`**.

### Response

```json
{
  "orders": [ /* slim mobile orders with product names */ ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 5,
    "totalRecords": 42
  }
}
```

### Examples

```http
GET /api/v1/mobile/orders?page=1&limit=10&filter=today
GET /api/v1/mobile/orders?page=2&limit=20&filter=custom&startDate=2026-05-01&endDate=2026-05-23
GET /api/v1/mobile/orders?status=completed&search=42
```

---

## 4. Cash / shift close (manager & owner only)

**403 for cashier role.** Implement only on manager UI (or hide tab for cashiers).

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/cash/shift/summary?filter=today` | Ticket #, reference, total per order + totals |
| GET | `/api/v1/cash/shift/detailed?filter=today` | Full orders (products, extras) + totals |
| POST | `/api/v1/cash/shift/close` | Close shift + print payload stub |

### Filters
Same as order history: `today` | `week` | `month` | `custom` + optional `startDate` / `endDate`.

**Close yesterday’s forgotten shift:**

```http
GET /api/v1/cash/shift/summary?filter=custom&startDate=2026-05-27&endDate=2026-05-27

POST /api/v1/cash/shift/close
{
  "filter": "custom",
  "startDate": "2026-05-27",
  "endDate": "2026-05-27",
  "note": "Closed next morning"
}
```

### Totals rules
- List includes active tickets: `confirmed`, `preparing`, `completed` (not `canceled`)
- **`grandTotal`**, cash/card split = **completed** orders only

### Close response (printer stub)

```json
{
  "closedAt": "...",
  "closedBy": "<staffId>",
  "period": { "filter": "custom", "start": "...", "end": "..." },
  "orders": [ ... ],
  "totals": { "grandTotal": 123.5, "cashTotal": 80, "cardTotal": 43.5, ... },
  "hardware": {
    "print": null,
    "openDrawer": false,
    "message": "Printer and cash drawer not configured..."
  },
  "printJob": {
    "kind": "customer_receipt",
    "title": "Shift close",
    "lines": [ { "text": "...", "bold": true } ],
    "escPosBase64": "..."
  }
}
```

When printer is wired: send `printJob.escPosBase64` to ESC/POS and pulse drawer on close.

---

## 5. Quick reference — mobile endpoints

| Action | Method | Path |
|--------|--------|------|
| Login | POST | `/api/v1/auth/login` |
| Me + PIN flags | GET | `/api/v1/auth/me` |
| Toggle PIN gate | PATCH | `/api/v1/auth/me/pin-mobile-enabled` |
| Change password | PATCH | `/api/v1/auth/me/password` |
| Verify PIN | POST | `/api/v1/auth/verify-pin` |
| Menu | GET | `/api/v1/catalog/categories/menu` |
| Create order | POST | `/api/v1/orders` |
| Order list (paginated) | GET | `/api/v1/mobile/orders` |
| Order detail | GET | `/api/v1/mobile/orders/{id}` |
| Order on table | GET | `/api/v1/mobile/orders/by-table/{tableId}` |
| Edit cart | PATCH | `/api/v1/mobile/orders/{id}` |
| Pay | PATCH | `/api/v1/orders/{id}/payment` |
| Status | PATCH | `/api/v1/orders/{id}/status` |
| Move table | PATCH | `/api/v1/orders/{id}/table` |
| Tables list | GET | `/api/v1/tables` |
| Kitchen queue | GET | `/api/v1/kitchen/orders` |
| Shift summary | GET | `/api/v1/cash/shift/summary` |
| Shift detailed | GET | `/api/v1/cash/shift/detailed` |
| Close shift | POST | `/api/v1/cash/shift/close` |
| Realtime | WS | `/api/v1/realtime?token=...` |

---

## 6. Suggested Flutter tasks (priority order)

1. **Tables tab + WebSocket** ⚠️ **— connect `/api/v1/realtime` after login; handle `table.updated` + `order.updated`; no polling. See §2.**
2. **HTTP client** — add `lang` header from app locale on every request.
3. **PIN settings screen** — switch bound to `pin-mobile-enabled`; verify with `currentPin` when disabling.
4. **Orders / history tab** — infinite scroll or page buttons using `pagination` from `GET /mobile/orders`.
5. **Manager cash screen** — summary + detailed modals; close shift POST; stash `printJob` for future printer plugin.
6. **Role gating** — hide cash + PIN management UI for `cashier`; show for `manager` and `owner`.

---

## Errors

Standard shape:

```json
{
  "error": {
    "code": "validation_error",
    "message": "... localized if lang header set ...",
    "details": { }
  }
}
```

OpenAPI documents all new routes under tag **Cash**, **Staff**, **Auth**, **Orders**.
