-- CreateEnum
CREATE TYPE "ProductKind" AS ENUM ('SIMPLE', 'COMPOSED');

-- CreateEnum
CREATE TYPE "CompositionSlotMode" AS ENUM ('INGREDIENTS', 'PRODUCTS');

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "price_cents" INTEGER NOT NULL DEFAULT 0,
    "supp_price_cents" INTEGER NOT NULL DEFAULT 0,
    "out_of_stock" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "composition_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "message" TEXT,
    "min" INTEGER NOT NULL DEFAULT 0,
    "max" INTEGER NOT NULL DEFAULT 1,
    "payment" BOOLEAN NOT NULL DEFAULT false,
    "selection" BOOLEAN NOT NULL DEFAULT false,
    "mode" "CompositionSlotMode" NOT NULL DEFAULT 'INGREDIENTS',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "composition_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "composition_type_ingredients" (
    "composition_type_id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "composition_type_ingredients_pkey" PRIMARY KEY ("composition_type_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "product_compositions" (
    "product_id" TEXT NOT NULL,
    "composition_type_id" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_compositions_pkey" PRIMARY KEY ("product_id","composition_type_id")
);

-- AlterTable
ALTER TABLE "products" ADD COLUMN "kind" "ProductKind" NOT NULL DEFAULT 'SIMPLE';

-- AlterTable
ALTER TABLE "order_lines" ADD COLUMN "composition_snapshot" JSONB;

-- AddForeignKey
ALTER TABLE "composition_type_ingredients" ADD CONSTRAINT "composition_type_ingredients_composition_type_id_fkey" FOREIGN KEY ("composition_type_id") REFERENCES "composition_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_type_ingredients" ADD CONSTRAINT "composition_type_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_compositions" ADD CONSTRAINT "product_compositions_composition_type_id_fkey" FOREIGN KEY ("composition_type_id") REFERENCES "composition_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "product_compositions_product_id_sort_order_key" ON "product_compositions"("product_id", "sort_order");
