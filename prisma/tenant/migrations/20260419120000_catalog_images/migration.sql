-- AlterTable
ALTER TABLE "categories" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN "out_of_stock" BOOLEAN NOT NULL DEFAULT false;
