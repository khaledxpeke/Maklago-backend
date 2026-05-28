# maklaGo — session summary (23 May 2026)

Summary of backend + backoffice work from today’s session.

---

## 1. Staff names: `firstName` + `lastName`

- Replaced single `fullName` with **`firstName`** and **`lastName`** on:
  - Tenant **`Staff`**
  - Registry **`Owner`**, **`PlatformAdmin`**
- Migrations:
  - `prisma/tenant/migrations/20260523120000_staff_first_last_name/`
  - `prisma/registry/migrations/20260523120000_first_last_name/`
- Updated auth, staff, sessions, platform routes, seed, backoffice UI, OpenAPI.

---

## 2. Money in JSON: major currency units (decimals)

- API JSON uses **major units** (e.g. `2.5` TND), not integer cents.
- DB still stores **cents** internally.
- Helpers: `backend/src/http/money.ts`
  - `majorToCents`, `centsToMajor`, `normalizeMajorUnits`
  - `moneyMajorSchema`, `discountPercentSchema` (Zod)
- **POST/PATCH orders** accept decimals; `z.coerce.number()` for Flutter `num` / doubles.
- Optional legacy **`priceCents`** on order lines/extras (prefer **`price`** as decimal).
- Fixed outdated docs that said “integer cents” (`flutter-realtime.md`).
- **Discount** in OpenAPI/responses: **`number`** (0–100), not integer-only.

### Pricing formula (orders)

| Step | Rule |
|------|------|
| Line subtotal | `count × price` (+ extras) |
| TVA | Per line: `round(lineSubtotal × taxBps / 10000)` |
| Default tax | **10%** (`default_tax_bps = 1000`) unless product override |
| Total | `subtotal + tva − discount` (discount % applies to gross) |

**Example:** 2 × 20.5, 10% tax, no discount → `subtotal: 41`, `tva: 4.1`, `total: 45.1`.

---

## 3. Orders lifecycle & dine-in

- New orders: **`confirmed`** immediately (cashier flow).
- Status flow: `confirmed` → `preparing` → `completed`; **`canceled`** from open states.
- **`waiting`** kept in DB for future QR/web.
- Table **`occupied`** when order is **`confirmed`** or **`preparing`** only.

### Order REST endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/orders` | Create order |
| GET | `/api/v1/orders` | List (enriched, backoffice) |
| PATCH | `/api/v1/orders/:id` | Edit cart |
| PATCH | `/api/v1/orders/:id/status` | Status change |
| PATCH | `/api/v1/orders/:id/payment` | `cash` / `card` |
| PATCH | `/api/v1/orders/:id/table` | Move dine-in table |
| GET | `/api/v1/orders/:id/logs` | Activity history |

### Mobile orders

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/mobile/orders` | Paginated slim list (`page`, `limit`, `filter`, `search`) |
| GET | `/api/v1/mobile/orders/:id` | Slim detail |
| GET | `/api/v1/mobile/orders/by-table/:tableId` | Active ticket on table |
| PATCH | `/api/v1/mobile/orders/:id` | Edit cart |

- WebSocket: **`order.created`**, **`order.updated`**, **`table.updated`**
- Docs: `backend/docs/flutter-realtime.md`

---

## 4. Activity / audit logs

- Schema: **`ActivityLog`** + enums `ActivityAction`, `ActivityEntityType`
- Migration: `20260523160000_activity_logs`
- Service: `backend/src/services/activityLog.ts`
- Logged actions: create, cart edit, status, payment, table move

### Read logs

```http
GET /api/v1/activity-logs?entityType=order&entityId={id}
GET /api/v1/activity-logs/orders/{orderId}
GET /api/v1/orders/{id}/logs
```

### Backoffice

- **Orders → View** modal: **Activity** timeline
- Files: `backoffice/src/features/orders/OrderActivityLog.tsx`, `OrdersPage.tsx`

---

## 5. Statistics API + dashboard

### API

```http
GET /api/v1/stats/statistics?filter=today|week|month|year|custom
GET /api/v1/stats/statistics?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

- Legacy-style stats adapted to maklaGo (revenue, status counts, payment breakdown, dine-in vs takeaway, top products, revenue over time, period comparison).
- Amounts in **major currency units**; period boundaries use **Africa/Tunis (Tunisia)**.
- Legacy **`GET /api/v1/stats/summary`** kept for simple aggregates.

### Backoffice dashboard

- Filter pills: Today / Week / Month / Year / Custom
- KPI cards + charts (Recharts): revenue over time, donut charts (status, payment, service type), vertical bar charts (top products)
- Files: `backoffice/src/features/dashboard/DashboardPage.tsx`, `StatisticsCharts.tsx`, `types.ts`

---

## 6. Kitchen display (KDS)

### REST

```http
GET  /api/v1/kitchen/orders              # confirmed + preparing queue
GET  /api/v1/kitchen/orders/{id}
PATCH /api/v1/kitchen/orders/{id}/seen   # clear isChanged tag
```

- Payload: **no prices**, product names, counts, extras — chef-friendly.
- **`isChanged`**: `true` when `cartRevision > kitchenSeenRevision` (cashier edited cart).
- Migration: `20260523180000_kitchen_cart_revision` (`cart_revision`, `kitchen_seen_revision`).

### WebSocket (same staff channel)

| Event | Payload |
|-------|---------|
| `kitchen.order.created` | Kitchen order JSON |
| `kitchen.order.updated` | Kitchen order JSON + status |

Cashier events (`order.created` / `order.updated`) unchanged.

---

## 7. Staff PIN (owner-managed)

Owners set or remove **4-digit PINs** for **manager** and **cashier** staff. Platform admin still bootstraps **owner** PIN at tenant creation; an owner may set/remove **their own** PIN.

| Action | Endpoint | Who |
|--------|----------|-----|
| Set staff PIN | `PUT /api/v1/staff/:id/pin` `{ "pin": "1234" }` | Owner only |
| Remove staff PIN | `DELETE /api/v1/staff/:id/pin` | Owner only |
| Verify PIN (mobile) | `POST /api/v1/auth/verify-pin` | Any staff with PIN |
| Owner mobile gate | `PATCH /api/v1/auth/me/pin-mobile-enabled` | Any staff with PIN (own account) |

- Staff list / `GET /auth/me` expose `hasPin` and `requiresMobilePin`. Any staff with a PIN can toggle the mobile gate via `PATCH /auth/me/pin-mobile-enabled` (not change the PIN itself).
- Backoffice: **Staff → Edit** — PIN section for owners on manager/cashier rows (and self).

---

## 8. Key files touched

| Area | Paths |
|------|--------|
| Orders | `backend/src/routes/api/v1/orders.ts`, `mobileOrders.ts` |
| Kitchen | `backend/src/routes/api/v1/kitchenOrders.ts`, `services/orderJsonKitchen.ts` |
| Cart / pricing | `backend/src/services/orderCart.ts`, `pricing.ts`, `http/money.ts` |
| Realtime | `backend/src/realtime/emitOrderRealtime.ts`, `staffRealtimeMessages.ts` |
| Activity | `backend/src/services/activityLog.ts`, `routes/api/v1/activityLogs.ts` |
| Stats | `backend/src/services/statistics.ts`, `routes/api/v1/stats.ts` |
| Schema | `backend/prisma/tenant/schema.prisma` |
| OpenAPI | `backend/src/openapi/openapi.json` |
| Mobile docs | `backend/docs/flutter-realtime.md` |
| Backoffice | `backoffice/src/features/dashboard/`, `orders/OrderActivityLog.tsx`, `staff/StaffPage.tsx` |

---

## 9. Migrations to run

```powershell
cd backend
npx prisma migrate deploy --schema prisma/tenant/schema.prisma
npx prisma migrate deploy --schema prisma/registry/schema.prisma   # if names not applied yet
npx prisma generate --schema prisma/tenant/schema.prisma
```

Tenant migrations from today (if not yet applied):

- `20260523120000_staff_first_last_name`
- `20260523140000_order_default_confirmed`
- `20260523160000_activity_logs`
- `20260523180000_kitchen_cart_revision`

---

## 10. Mobile quick reference

| Action | Endpoint |
|--------|----------|
| Create order | `POST /api/v1/orders` |
| Order on table | `GET /api/v1/mobile/orders/by-table/{tableId}` |
| Edit cart | `PATCH /api/v1/mobile/orders/{id}` |
| Pay | `PATCH /api/v1/orders/{id}/payment` |
| Status | `PATCH /api/v1/orders/{id}/status` |
| Kitchen queue | `GET /api/v1/kitchen/orders` |
| Kitchen ack | `PATCH /api/v1/kitchen/orders/{id}/seen` |
| Live updates | `ws://host/api/v1/realtime?token=...` |
| Verify PIN | `POST /api/v1/auth/verify-pin` |

**Money in JSON:** decimals (`20.5`, `41`, `4.1`, `45.1`) — not cents.
