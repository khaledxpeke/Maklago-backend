-- Table numbers unique per zone; every table must belong to a zone.

-- Ensure at least one zone exists for backfill
INSERT INTO "table_zones" ("id", "name", "sort_order", "created_at")
SELECT substring(replace(gen_random_uuid()::text, '-', ''), 1, 12), 'General', 0, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "table_zones" LIMIT 1);

UPDATE "restaurant_tables" AS rt
SET "zone_id" = (
    SELECT tz."id" FROM "table_zones" AS tz ORDER BY tz."sort_order" ASC, tz."name" ASC LIMIT 1
)
WHERE rt."zone_id" IS NULL;

ALTER TABLE "restaurant_tables" ALTER COLUMN "zone_id" SET NOT NULL;

ALTER TABLE "restaurant_tables" DROP CONSTRAINT IF EXISTS "restaurant_tables_zone_id_fkey";

ALTER TABLE "restaurant_tables" ADD CONSTRAINT "restaurant_tables_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "table_zones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "restaurant_tables" DROP CONSTRAINT IF EXISTS "restaurant_tables_table_number_key";

ALTER TABLE "restaurant_tables" ADD CONSTRAINT "restaurant_tables_zone_id_table_number_key" UNIQUE ("zone_id", "table_number");
