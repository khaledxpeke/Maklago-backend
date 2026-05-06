-- TableZone entity; tables reference zone; seats; drop legacy name + free-text zone.

CREATE TABLE "table_zones" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "table_zones_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "table_zones_name_key" ON "table_zones"("name");

-- New columns on restaurant_tables (FK added after backfill)
ALTER TABLE "restaurant_tables" ADD COLUMN "zone_id" TEXT;
ALTER TABLE "restaurant_tables" ADD COLUMN "seat_count" INTEGER NOT NULL DEFAULT 4;

-- One row per distinct legacy zone string
INSERT INTO "table_zones" ("id", "name", "sort_order")
SELECT substring(replace(gen_random_uuid()::text, '-', ''), 1, 12), trimmed, 0
FROM (
    SELECT DISTINCT trim(both from "zone") AS trimmed
    FROM "restaurant_tables"
    WHERE "zone" IS NOT NULL AND trim(both from "zone") <> ''
) AS u;

UPDATE "restaurant_tables" AS rt
SET "zone_id" = tz."id"
FROM "table_zones" AS tz
WHERE rt."zone" IS NOT NULL AND trim(both from rt."zone") <> '' AND tz."name" = trim(both from rt."zone");

ALTER TABLE "restaurant_tables" DROP COLUMN "zone";
ALTER TABLE "restaurant_tables" DROP COLUMN "name";

ALTER TABLE "restaurant_tables" ADD CONSTRAINT "restaurant_tables_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "table_zones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
