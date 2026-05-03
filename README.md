# maklaGo backend

Express + Prisma (PostgreSQL) API for the restaurant POS. OpenAPI/Swagger UI is built in.

## Prerequisites

- **Node.js** (LTS recommended)
- **PostgreSQL** running locally or reachable on the network

## First-time setup

1. **Install dependencies** (runs Prisma Client generation via `postinstall`). Clients under `src/db/tenant-client` and `src/db/registry-client` are **not** committed — everyone generates them locally from `prisma/*/schema.prisma`.

   ```bash
   npm install
   ```

2. **Environment file** — copy the example and edit URLs/secrets:

   ```bash
   copy .env.example .env
   ```

   On macOS/Linux:

   ```bash
   cp .env.example .env
   ```

3. **Create two databases** in PostgreSQL (names must match your URLs in `.env`), for example:

   ```sql
   CREATE DATABASE maklago_registry;
   CREATE DATABASE maklago_tenant_demo;
   ```

   Adjust user/password in `REGISTRY_DATABASE_URL` and `TENANT_DATABASE_URL` if needed.

4. **Apply migrations** (registry DB + tenant/demo DB):

   ```bash
   npm run prisma:migrate:registry
   npm run prisma:migrate:tenant
   ```

   For a **new tenant database** (different URL than `.env`), run migrations against that URL once before registering the tenant:

   ```bash
   npx ts-node src/scripts/migrateTenantDatabase.ts "postgresql://user:pass@host:5432/your_tenant_db"
   ```

   (Same as `npm run prisma:migrate:tenant:url` — pass the connection string as the first argument.)

5. **Optional demo data** (staff, catalog, etc. on the tenant DB pointed to by `TENANT_DATABASE_URL`):

   ```bash
   npm run seed
   ```

## Creating a new restaurant

Use this when you add another restaurant after initial setup. Each restaurant has **its own PostgreSQL database** and one **registry** row that points at it.

1. **Create a database** in PostgreSQL for that tenant (example name: `maklago_tenant_nolita`).

2. **Apply the tenant schema** to that database from the `backend/` folder (replace with your real connection string and host):

   ```bash
   npm run prisma:migrate:tenant:url -- "postgresql://USER:PASSWORD@localhost:5432/your_tenant_db"
   ```

   The database must be migrated **before** you register the tenant or the app cannot create staff and orders there.

3. **Run the API** (`npm run dev` in `backend/`) so the platform and tenant routes are available.

4. **Register the tenant** using either the backoffice or the API:

   - **Backoffice:** open the [backoffice](../backoffice) app → **Platform admin sign in** (`/platform-login`) → **Platform tenants** (`/platform`) → **New restaurant**. Enter a unique **slug** (lowercase letters, numbers, hyphens), **display name**, and the **same database URL** as in step 2. Optionally set **owner** email, password (8+ characters), and full name: that creates an **owner** staff user in the tenant database so you can sign in on the Connection page.
   - **API:** `POST /platform/v1/auth/login`, then `POST /platform/v1/tenants` with `slug`, `name`, `databaseUrl`, and optional `ownerEmail` / `ownerPassword` / `ownerFullName` (see OpenAPI).

5. **Sign in as restaurant staff** in the backoffice: **Connection** → set **tenant slug** to the slug from step 4 → **Sign in** with the owner credentials from step 4 (or another staff user you create in that tenant DB).

**Important:**

- **`TENANT_DATABASE_URL` in `.env` does not control which database the API uses for a given restaurant.** At runtime the API reads **`database_url`** from the **registry** `tenants` table. Keep `.env`’s `TENANT_DATABASE_URL` for **local CLI** only (default migrate/seed/Studio), or point it at whichever DB you want to inspect with `npm run prisma:studio:tenant`.
- **Deleting** a tenant in the platform UI removes the **registry** row (and registry owners); it **does not** drop the PostgreSQL database. Drop the database yourself if you no longer need it.

## Run the API (development)

```bash
npm run dev
```

Server listens on `http://localhost:3000` (or `PORT` from `.env`).

## Login (quick reference)

There are **two separate logins**: platform super-admin (registry) and restaurant staff (per tenant). Tokens are **not interchangeable**.

### Platform admin (super admin)

Use this to manage tenants (`POST /platform/v1/tenants`, etc.). **No tenant header.**

```http
POST /platform/v1/auth/login
Content-Type: application/json

{ "email": "admin@maklago.local", "password": "admin123456" }
```

Defaults match `PLATFORM_ADMIN_EMAIL` / `PLATFORM_ADMIN_PASSWORD` in `.env.example` and are created/updated when you run `npm run seed`. Response includes `accessToken` and `admin`.

```bash
curl -s -X POST http://localhost:3000/platform/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@maklago.local\",\"password\":\"admin123456\"}"
```

Then call platform routes with `Authorization: Bearer <accessToken>`.

When `PLATFORM_API_KEY` is set, tenant provisioning routes also accept `x-platform-key` instead of logging in (for scripts).

### Restaurant staff (cashier / manager / owner)

Use this for `/api/v1/*` (orders, catalog, sessions).

**Login (`POST /api/v1/auth/login`)** — pick one:

1. **Slugless (mobile-friendly):** send only JSON `{ "email", "password" }`. The registry **`staff_login_directory`** maps the email (normalized, **unique platform-wide**) to the tenant DB where `Staff` lives; password is still verified in that tenant DB.
2. **With tenant header:** send **`x-tenant-id`** (slug or tenant UUID) as before if you want an explicit venue without using the directory.

After `npm run seed`, demo restaurant staff (tenant slug **`demo`**, password **`demo123456`** for both):

| Email | Role | Use |
|--------|------|-----|
| `owner@demo.local` | **owner** | Full access including editing other owners; listed under Platform → **Registry owners**. |
| `manager@demo.local` | **manager** | Day-to-day admin demo (cannot edit owner accounts). |

For **production** venues, the owner is normally created when you provision the tenant with **`ownerEmail`** / **`ownerPassword`**, or another owner promotes staff in the backoffice.

Optional header for explicit tenant: `x-tenant-id: demo` (see `TENANT_HEADER` in `.env`).

```http
POST /api/v1/auth/login
Content-Type: application/json

{ "email": "owner@demo.local", "password": "demo123456" }
```

```bash
curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"owner@demo.local\",\"password\":\"demo123456\"}"
```

Response includes **`accessToken`**, **`expiresIn`**, **`tenantId`**, **`tenantSlug`**, and **`staff`**. Flutter can cache **`tenantSlug`** for display; it does **not** need to send **`x-tenant-id`** on later calls.

**Authenticated routes:** send **`Authorization: Bearer <accessToken>`**. If you omit **`x-tenant-id`**, the API resolves the tenant from the JWT and attaches the correct database pool.

**Current user:** `GET /api/v1/auth/me` with bearer token only (tenant header optional).

**Existing databases:** apply registry migrations, then run **`npm run backfill:staff-directory`** once so every active staff row gets a directory entry (or re-run **`npm run seed`** for demo).

---

**Staff emails must be unique across all restaurants** for slugless login. Creating or renaming staff checks the registry and returns **`409`** if the email is already used by another tenant.

## Build and run (production-style)

```bash
npm run build
npm start
```

## Swagger / OpenAPI

After the server is running:

| What | URL |
|------|-----|
| **Swagger UI** (try requests in the browser) | `http://localhost:3000/docs` |
| **OpenAPI JSON** (import into Postman, codegen, etc.) | `http://localhost:3000/openapi.json` |

The spec file in the repo is `src/openapi/openapi.json`. Update it when you change routes.

**Typical tenant API usage:** Log in with `POST /api/v1/auth/login` (tenant header optional if the staff email is in the registry directory). Then use **`Authorization: Bearer <accessToken>`** on protected routes — **`x-tenant-id`** is optional once you have a staff JWT; you may still send it for explicit routing or debugging. Defaults and `curl` examples are in [Login (quick reference)](#login-quick-reference).

**Platform (super admin):** `POST /platform/v1/auth/login` with JSON `email` / `password` → `Authorization: Bearer <token>` on `/platform/*`. Defaults after seed: see `.env.example` (`PLATFORM_ADMIN_*`). Optional `x-platform-key` when `PLATFORM_API_KEY` is set. Routes include `GET/POST /platform/v1/tenants`, `GET/PATCH /platform/v1/tenants/{id}`, `GET /platform/v1/auth/me`.

**Tenant admin (owner/manager):** Products expose **`price`** (main units in JSON; cents in DB), **`modifiers`**, and **`kind`** (`simple` vs `composed`). Omit **`kind`** on create only when inferring composed products from non-empty **`compositionTypeIds`**. **Extras** (add-ons for composed-product steps) use **`price`** / **`suppPrice`** in catalog JSON (same semantics as the former “ingredients” model). **`CompositionSlotMode`** in the DB is **`extras`** or **`products`** (only **`extras`** is used today).

**Orders:** `POST /api/v1/orders` sends **`products`**: `{ categoryId, _id, count, price (cents), extras?, note? }` per row (validated against catalog). Root **`note`** is ticket-wide; each row's **`note`** is line-only (e.g. prep). **`discount`** is order-level percent **0–100**. New orders are **`waiting`** until patched. See **`CreateOrderRequest`** in OpenAPI.

**Tenant admin routes:** `POST/PATCH/DELETE /api/v1/catalog/categories`, `POST/PATCH/DELETE /api/v1/catalog/products`, **`GET/POST /api/v1/catalog/extras`**, **`PATCH/DELETE /api/v1/catalog/extras/{id}`**, **`GET/POST /api/v1/catalog/composition-types`**, **`PATCH/DELETE /api/v1/catalog/composition-types/{id}`**, **`PUT /api/v1/catalog/composition-types/{id}/extras`** (body **`{ "extraIds": ["uuid", ...] }`**), and `GET/POST/PATCH /api/v1/staff` for menu and staff management.

## CORS

If the web app runs on another origin (e.g. Flutter web on port 5173), set in `.env`:

```env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

Use `CORS_ORIGIN=*` for permissive local dev. Omit `CORS_ORIGIN` to leave the default (no CORS middleware).

## Prisma

| Command | Purpose |
|---------|---------|
| `npm run prisma:generate` | Regenerate both Prisma clients |
| `npm run prisma:migrate:registry` | Apply registry migrations |
| `npm run prisma:migrate:tenant` | Apply tenant schema migrations to `TENANT_DATABASE_URL` |
| `npm run prisma:migrate:tenant:url -- "postgresql://..."` | Apply tenant migrations to an arbitrary DB URL (new restaurant DB) |
| `npm run prisma:studio:registry` | Open Prisma Studio for the **registry** DB (default [http://localhost:5555](http://localhost:5555)) |
| `npm run prisma:studio:tenant` | Prisma Studio for the **tenant** schema DB on port **5556** (avoids clashing with registry) |
| `npm run backfill:staff-directory` | Populate registry **`staff_login_directory`** from all tenant DBs (run after registry migrations on existing installs) |

**Note:** In production each tenant can have its **own** database URL stored in the registry. Studio using `TENANT_DATABASE_URL` only shows that one database. To inspect another tenant DB, point `TENANT_DATABASE_URL` at that connection string (or copy the URL from the `tenants` table in the registry DB) and run `prisma:studio:tenant` again.

## Environment variables (reference)

See `.env.example`. Important entries:

- `REGISTRY_DATABASE_URL` — platform DB (tenant registry, owners, **staff_login_directory** for slugless staff login).
- `TENANT_DATABASE_URL` — tenant app schema (orders, staff, catalog). Used for migrations and local Studio.
- `TENANT_HEADER` — default `x-tenant-id`.
- `JWT_SECRET`, `JWT_EXPIRES_IN`, `BCRYPT_ROUNDS` — auth.
- `PLATFORM_ADMIN_EMAIL`, `PLATFORM_ADMIN_PASSWORD` — seeded platform super-admin (`npm run seed`); used with `POST /platform/v1/auth/login`.
- `PLATFORM_API_KEY` — optional; platform routes accept `x-platform-key` when set.
- `CORS_ORIGIN` — optional; see [CORS](#cors).

## Tests

```bash
npm test
```

Runs Vitest (health check without a database). **Integration tests** (login + create order) need migrated DBs, seed data, and:

```bash
npm run test:integration
```

Optional env overrides: `TEST_TENANT_SLUG`, `TEST_STAFF_EMAIL`, `TEST_STAFF_PASSWORD` (defaults align with seed: `demo`, `manager@demo.local`, `demo123456` when not set).

## Health check

```bash
curl http://localhost:3000/health
```
