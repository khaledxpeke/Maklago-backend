-- Align tenant schema with Mongo-style fields (Product.choice, discounts, Order command metadata).

CREATE TYPE "ProductChoice" AS ENUM ('SEUL', 'MULTIPLE');

ALTER TABLE "products" ADD COLUMN "formule_price" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "products" ADD COLUMN "choice" "ProductChoice" NOT NULL DEFAULT 'SEUL';
ALTER TABLE "products" ADD COLUMN "discount_value" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "products" ADD COLUMN "original_price" INTEGER;
ALTER TABLE "products" ADD COLUMN "discount_start_date" TIMESTAMP(3);
ALTER TABLE "products" ADD COLUMN "discount_end_date" TIMESTAMP(3);

ALTER TABLE "orders" ADD COLUMN "customer_name" TEXT;
ALTER TABLE "orders" ADD COLUMN "customer_email" TEXT;
ALTER TABLE "orders" ADD COLUMN "command_number" INTEGER;
ALTER TABLE "orders" ADD COLUMN "currency" TEXT;
ALTER TABLE "orders" ADD COLUMN "pack" JSONB;
ALTER TABLE "orders" ADD COLUMN "payment_method" JSONB;
ALTER TABLE "orders" ADD COLUMN "order_discount_value" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN "logo_path" TEXT;
