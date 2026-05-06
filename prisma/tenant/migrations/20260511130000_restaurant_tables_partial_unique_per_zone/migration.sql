-- Per-zone table numbers, uniqueness only among active rows (soft-deleted tables do not block reuse).
-- Also drops legacy global unique on `table_number` if migrations were skipped.

DROP INDEX IF EXISTS "restaurant_tables_table_number_key";

ALTER TABLE "restaurant_tables" DROP CONSTRAINT IF EXISTS "restaurant_tables_table_number_key";

ALTER TABLE "restaurant_tables" DROP CONSTRAINT IF EXISTS "restaurant_tables_zone_id_table_number_key";

ALTER TABLE "restaurant_tables" DROP CONSTRAINT IF EXISTS "RestaurantTable_zoneId_tableNumber_key";

DROP INDEX IF EXISTS "restaurant_tables_zone_id_table_number_active_key";

CREATE UNIQUE INDEX "restaurant_tables_zone_id_table_number_active_key"
  ON "restaurant_tables" ("zone_id", "table_number")
  WHERE "is_active" = true;
