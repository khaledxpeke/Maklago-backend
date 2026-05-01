-- Rename ingredient terminology to extras (tables, FK column, enum label).

-- DropForeignKey
ALTER TABLE "composition_type_ingredients" DROP CONSTRAINT "composition_type_ingredients_composition_type_id_fkey";
ALTER TABLE "composition_type_ingredients" DROP CONSTRAINT "composition_type_ingredients_ingredient_id_fkey";

-- RenameTable
ALTER TABLE "ingredients" RENAME TO "extras";
ALTER TABLE "composition_type_ingredients" RENAME TO "composition_type_extras";

-- RenameColumn
ALTER TABLE "composition_type_extras" RENAME COLUMN "ingredient_id" TO "extra_id";

-- RenameConstraint
ALTER TABLE "extras" RENAME CONSTRAINT "ingredients_pkey" TO "extras_pkey";
ALTER TABLE "composition_type_extras" RENAME CONSTRAINT "composition_type_ingredients_pkey" TO "composition_type_extras_pkey";

-- RenameEnumValue (PostgreSQL 10+); refresh default that referenced INGREDIENTS
ALTER TABLE "composition_types" ALTER COLUMN "mode" DROP DEFAULT;
ALTER TYPE "CompositionSlotMode" RENAME VALUE 'INGREDIENTS' TO 'EXTRAS';
ALTER TABLE "composition_types" ALTER COLUMN "mode" SET DEFAULT 'EXTRAS'::"CompositionSlotMode";

-- AddForeignKey
ALTER TABLE "composition_type_extras" ADD CONSTRAINT "composition_type_extras_composition_type_id_fkey" FOREIGN KEY ("composition_type_id") REFERENCES "composition_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "composition_type_extras" ADD CONSTRAINT "composition_type_extras_extra_id_fkey" FOREIGN KEY ("extra_id") REFERENCES "extras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
