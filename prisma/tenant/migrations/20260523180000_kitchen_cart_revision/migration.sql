-- AlterTable
ALTER TABLE "orders" ADD COLUMN "cart_revision" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN "kitchen_seen_revision" INTEGER NOT NULL DEFAULT 0;
