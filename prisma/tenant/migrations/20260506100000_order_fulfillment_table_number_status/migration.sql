-- Order dine-in vs takeaway; table display number + free/occupied.

CREATE TYPE "OrderFulfillment" AS ENUM ('dine_in', 'takeaway');

ALTER TABLE "orders" ADD COLUMN "fulfillment" "OrderFulfillment" NOT NULL DEFAULT 'takeaway';

UPDATE "orders" SET "fulfillment" = 'dine_in' WHERE "table_id" IS NOT NULL;

CREATE TYPE "TableStatus" AS ENUM ('free', 'occupied');

ALTER TABLE "restaurant_tables" ADD COLUMN "table_number" INTEGER;
ALTER TABLE "restaurant_tables" ADD COLUMN "status" "TableStatus" NOT NULL DEFAULT 'free';

UPDATE "restaurant_tables" rt
SET "table_number" = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY sort_order ASC, created_at ASC) AS rn
  FROM restaurant_tables
) sub
WHERE rt.id = sub.id;

ALTER TABLE "restaurant_tables" ALTER COLUMN "table_number" SET NOT NULL;

CREATE UNIQUE INDEX "restaurant_tables_table_number_key" ON "restaurant_tables" ("table_number");

UPDATE "restaurant_tables" t
SET "status" = 'occupied'
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.table_id = t.id
    AND o.fulfillment = 'dine_in'
    AND o.status IN ('draft', 'active')
);
