-- One-time data migration: UUID-shaped tenant entity ids → 12 lowercase hex public ids.
-- Mapping: lower(substring(md5(salt || old_id) FROM 1 FOR 12)). Salts: category, extra, ctype, product, rtable, staff, csession, order, oline.
-- Rows whose id does not match UUID v4 text pattern are unchanged (already public ids).
-- After deploy on each tenant DB: run `npm run registry:sync-staff-ids` so staff_login_directory.staff_id matches migrated staff rows.

CREATE OR REPLACE FUNCTION _tenant_uuid_v4_text(txt TEXT)
RETURNS BOOLEAN
LANGUAGE sql
IMMUTABLE
STRICT
AS $$
  SELECT txt ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
$$;

CREATE OR REPLACE FUNCTION _tenant_public_id_from_uuid(old_id TEXT, salt TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
STRICT
AS $$
  SELECT lower(substring(md5(salt || old_id) FROM 1 FOR 12));
$$;

-- --- Duplicate detection (fail fast if md5 truncation collides within a table) ---
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'staff') AS nid FROM staff WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: staff id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'category') AS nid FROM categories WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: category id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'extra') AS nid FROM extras WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: extra id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'ctype') AS nid FROM composition_types WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: composition_types id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'product') AS nid FROM products WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: product id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'rtable') AS nid FROM restaurant_tables WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: restaurant_tables id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'csession') AS nid FROM cashier_sessions WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: cashier_sessions id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'order') AS nid FROM orders WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: orders id hash collision'; END IF;

  IF EXISTS (
    SELECT 1 FROM (
      SELECT _tenant_public_id_from_uuid(id, 'oline') AS nid FROM order_lines WHERE _tenant_uuid_v4_text(id)
    ) s GROUP BY nid HAVING COUNT(*) > 1
  ) THEN RAISE EXCEPTION 'tenant migration: order_lines id hash collision'; END IF;
END $$;

-- --- Drop FKs (child → parent) ---
ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_category_id_fkey";
ALTER TABLE "cashier_sessions" DROP CONSTRAINT IF EXISTS "cashier_sessions_staff_id_fkey";
ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_table_id_fkey";
ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_staff_id_fkey";
ALTER TABLE "order_lines" DROP CONSTRAINT IF EXISTS "order_lines_order_id_fkey";
ALTER TABLE "order_lines" DROP CONSTRAINT IF EXISTS "order_lines_product_id_fkey";
ALTER TABLE "composition_type_extras" DROP CONSTRAINT IF EXISTS "composition_type_extras_composition_type_id_fkey";
ALTER TABLE "composition_type_extras" DROP CONSTRAINT IF EXISTS "composition_type_extras_extra_id_fkey";
ALTER TABLE "product_compositions" DROP CONSTRAINT IF EXISTS "product_compositions_product_id_fkey";
ALTER TABLE "product_compositions" DROP CONSTRAINT IF EXISTS "product_compositions_composition_type_id_fkey";

-- --- Drop PKs / supporting unique indexes that reference migrated columns ---
ALTER TABLE "composition_type_extras" DROP CONSTRAINT IF EXISTS "composition_type_extras_pkey";
ALTER TABLE "product_compositions" DROP CONSTRAINT IF EXISTS "product_compositions_pkey";
DROP INDEX IF EXISTS "product_compositions_product_id_sort_order_key";

ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS "categories_pkey";
ALTER TABLE "extras" DROP CONSTRAINT IF EXISTS "extras_pkey";
ALTER TABLE "composition_types" DROP CONSTRAINT IF EXISTS "composition_types_pkey";
ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_pkey";
ALTER TABLE "staff" DROP CONSTRAINT IF EXISTS "staff_pkey";
ALTER TABLE "restaurant_tables" DROP CONSTRAINT IF EXISTS "restaurant_tables_pkey";
ALTER TABLE "cashier_sessions" DROP CONSTRAINT IF EXISTS "cashier_sessions_pkey";
ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_pkey";
ALTER TABLE "order_lines" DROP CONSTRAINT IF EXISTS "order_lines_pkey";

-- --- Materialized maps (inline subqueries kept readable via UPDATE … FROM) ---

-- 1) Categories: fix products.category_id first (still points at old category ids).
UPDATE "products" p
SET "category_id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'category') AS new_id
  FROM categories
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE p."category_id" = m.old_id;

UPDATE "categories" c
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'category') AS new_id
  FROM categories
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE c."id" = m.old_id;

-- category_id on order_lines: remap UUID category refs (Prisma does not FK this column).
UPDATE "order_lines" ol
SET "category_id" = _tenant_public_id_from_uuid(ol."category_id", 'category')
WHERE _tenant_uuid_v4_text(ol."category_id");

-- 2) Extras & composition types (parents before join rows).
UPDATE "extras" e
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'extra') AS new_id
  FROM extras
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE e."id" = m.old_id;

UPDATE "composition_types" ct
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'ctype') AS new_id
  FROM composition_types
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE ct."id" = m.old_id;

-- 3) Join table composition_type_extras (FK columns hold legacy UUIDs until rewritten).
UPDATE "composition_type_extras" x
SET "composition_type_id" = _tenant_public_id_from_uuid(x."composition_type_id", 'ctype')
WHERE _tenant_uuid_v4_text(x."composition_type_id");

UPDATE "composition_type_extras" x
SET "extra_id" = _tenant_public_id_from_uuid(x."extra_id", 'extra')
WHERE _tenant_uuid_v4_text(x."extra_id");

-- 4) Product compositions (before products PK swap).
UPDATE "product_compositions" pc
SET "product_id" = _tenant_public_id_from_uuid(pc."product_id", 'product')
WHERE _tenant_uuid_v4_text(pc."product_id");

UPDATE "product_compositions" pc
SET "composition_type_id" = _tenant_public_id_from_uuid(pc."composition_type_id", 'ctype')
WHERE _tenant_uuid_v4_text(pc."composition_type_id");

-- 5) Products.
UPDATE "products" p
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'product') AS new_id
  FROM products
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE p."id" = m.old_id;

UPDATE "order_lines" ol
SET "product_id" = _tenant_public_id_from_uuid(ol."product_id", 'product')
WHERE _tenant_uuid_v4_text(ol."product_id");

-- 6) Staff & tables & sessions (sessions before orders if orders referenced sessions — not anymore).
UPDATE "staff" s
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'staff') AS new_id
  FROM staff
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE s."id" = m.old_id;

UPDATE "restaurant_tables" t
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'rtable') AS new_id
  FROM restaurant_tables
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE t."id" = m.old_id;

UPDATE "cashier_sessions" cs
SET "staff_id" = _tenant_public_id_from_uuid(cs."staff_id", 'staff')
WHERE _tenant_uuid_v4_text(cs."staff_id");

UPDATE "cashier_sessions" cs
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'csession') AS new_id
  FROM cashier_sessions
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE cs."id" = m.old_id;

-- 7) Orders (staff/table FK columns, then PK).
UPDATE "orders" o
SET "staff_id" = _tenant_public_id_from_uuid(o."staff_id", 'staff')
WHERE _tenant_uuid_v4_text(o."staff_id");

UPDATE "orders" o
SET "table_id" = _tenant_public_id_from_uuid(o."table_id", 'rtable')
WHERE o."table_id" IS NOT NULL AND _tenant_uuid_v4_text(o."table_id");

UPDATE "order_lines" ol
SET "order_id" = _tenant_public_id_from_uuid(ol."order_id", 'order')
WHERE _tenant_uuid_v4_text(ol."order_id");

UPDATE "orders" o
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'order') AS new_id
  FROM orders
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE o."id" = m.old_id;

UPDATE "order_lines" ol
SET "id" = m.new_id
FROM (
  SELECT id AS old_id, _tenant_public_id_from_uuid(id, 'oline') AS new_id
  FROM order_lines
  WHERE _tenant_uuid_v4_text(id)
) m
WHERE ol."id" = m.old_id;

-- --- Recreate PKs ---
ALTER TABLE "categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");
ALTER TABLE "extras" ADD CONSTRAINT "extras_pkey" PRIMARY KEY ("id");
ALTER TABLE "composition_types" ADD CONSTRAINT "composition_types_pkey" PRIMARY KEY ("id");
ALTER TABLE "composition_type_extras" ADD CONSTRAINT "composition_type_extras_pkey" PRIMARY KEY ("composition_type_id", "extra_id");
ALTER TABLE "products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");
ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_pkey" PRIMARY KEY ("product_id", "composition_type_id");
CREATE UNIQUE INDEX "product_compositions_product_id_sort_order_key" ON "product_compositions" ("product_id", "sort_order");

ALTER TABLE "staff" ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("id");
ALTER TABLE "restaurant_tables" ADD CONSTRAINT "restaurant_tables_pkey" PRIMARY KEY ("id");
ALTER TABLE "cashier_sessions" ADD CONSTRAINT "cashier_sessions_pkey" PRIMARY KEY ("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");
ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_pkey" PRIMARY KEY ("id");

-- --- Recreate FKs (names aligned with Prisma history) ---
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cashier_sessions" ADD CONSTRAINT "cashier_sessions_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "restaurant_tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "composition_type_extras" ADD CONSTRAINT "composition_type_extras_composition_type_id_fkey" FOREIGN KEY ("composition_type_id") REFERENCES "composition_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "composition_type_extras" ADD CONSTRAINT "composition_type_extras_extra_id_fkey" FOREIGN KEY ("extra_id") REFERENCES "extras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_composition_type_id_fkey" FOREIGN KEY ("composition_type_id") REFERENCES "composition_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Helpers only needed during migrate deploy.
DROP FUNCTION IF EXISTS _tenant_public_id_from_uuid(TEXT, TEXT);
DROP FUNCTION IF EXISTS _tenant_uuid_v4_text(TEXT);
