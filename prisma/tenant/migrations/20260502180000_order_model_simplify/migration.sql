-- Slim order model: OrderType (rename from OrderFulfillment), new lifecycle statuses, payment enum,
-- daily command sequence, discount fields, optional idempotency/session/mongo baggage removed.

ALTER TYPE "OrderFulfillment" RENAME TO "OrderType";

ALTER TABLE "orders" RENAME COLUMN "fulfillment" TO "order_type";

-- Replace OrderStatus enum values (draft/active -> waiting/confirmed + preparing).
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";

CREATE TYPE "OrderStatus" AS ENUM ('waiting', 'confirmed', 'preparing', 'completed', 'canceled');

ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "orders"
ALTER COLUMN "status" TYPE "OrderStatus"
USING (
  CASE ("status"::text)::text
    WHEN 'draft' THEN 'waiting'::"OrderStatus"
    WHEN 'active' THEN 'confirmed'::"OrderStatus"
    WHEN 'completed' THEN 'completed'::"OrderStatus"
    WHEN 'canceled' THEN 'canceled'::"OrderStatus"
    ELSE 'waiting'::"OrderStatus"
  END
);

DROP TYPE "OrderStatus_old";

ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'waiting'::"OrderStatus";

CREATE TYPE "PaymentMethod" AS ENUM ('cash', 'card', 'unpaid');

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'orders'
      AND column_name = 'payment_method'
      AND data_type = 'jsonb'
  ) THEN
    ALTER TABLE "orders" RENAME COLUMN "payment_method" TO "payment_method_legacy";
    ALTER TABLE "orders" ADD COLUMN "payment_method" "PaymentMethod" NOT NULL DEFAULT 'unpaid';
    ALTER TABLE "orders" DROP COLUMN "payment_method_legacy";
  ELSIF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE "orders" ADD COLUMN "payment_method" "PaymentMethod" NOT NULL DEFAULT 'unpaid';
  END IF;
END $$;

DROP INDEX IF EXISTS "orders_idempotency_key_key";

DROP INDEX IF EXISTS "orders_session_id_idx";

ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_session_id_fkey";

ALTER TABLE "orders" DROP COLUMN IF EXISTS "session_id";

ALTER TABLE "orders" DROP COLUMN IF EXISTS "idempotency_key";

ALTER TABLE "orders" DROP COLUMN IF EXISTS "customer_email";

ALTER TABLE "orders" DROP COLUMN IF EXISTS "currency";

ALTER TABLE "orders" DROP COLUMN IF EXISTS "pack";

ALTER TABLE "orders" DROP COLUMN IF EXISTS "logo_path";

ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "reference" TEXT;

UPDATE "orders" SET "reference" = "id"::text WHERE "reference" IS NULL OR "reference" = '';

ALTER TABLE "orders" ALTER COLUMN "reference" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "orders_reference_key" ON "orders"("reference");

ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "command_date" DATE;

UPDATE "orders"
SET "command_date" = ("created_at" AT TIME ZONE 'UTC')::date
WHERE "command_date" IS NULL;

ALTER TABLE "orders" ALTER COLUMN "command_date" SET NOT NULL;

ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "discount_percent" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "discount_price_cents" INTEGER NOT NULL DEFAULT 0;

UPDATE "orders" SET "discount_price_cents" = COALESCE("order_discount_value", 0);

ALTER TABLE "orders" DROP COLUMN IF EXISTS "order_discount_value";

ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "note" TEXT;

UPDATE "orders" SET "staff_id" = (SELECT "id" FROM "staff" LIMIT 1) WHERE "staff_id" IS NULL;

ALTER TABLE "orders" ALTER COLUMN "staff_id" SET NOT NULL;

ALTER TABLE "orders" DROP CONSTRAINT IF EXISTS "orders_staff_id_fkey";

ALTER TABLE "orders"
ADD CONSTRAINT "orders_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "command_number" INTEGER;

WITH numbered AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY ("created_at" AT TIME ZONE 'UTC')::date
      ORDER BY "created_at"
    ) AS rn
  FROM "orders"
)
UPDATE "orders" o
SET "command_number" = n.rn
FROM numbered n
WHERE o."id" = n."id";

ALTER TABLE "orders" ALTER COLUMN "command_number" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "orders_command_date_command_number_key" ON "orders"("command_date", "command_number");

ALTER TABLE "order_lines" ADD COLUMN IF NOT EXISTS "category_id" TEXT;

UPDATE "order_lines" ol
SET "category_id" = p."category_id"
FROM "products" p
WHERE p."id" = ol."product_id" AND (ol."category_id" IS NULL OR ol."category_id" = '');

ALTER TABLE "order_lines" ALTER COLUMN "category_id" SET NOT NULL;

ALTER TABLE "order_lines" ADD COLUMN IF NOT EXISTS "extras_snapshot" JSONB;
