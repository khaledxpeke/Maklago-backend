-- Lowercase all PostgreSQL enum labels (API + DB consistency).

-- StaffRole
ALTER TYPE "StaffRole" RENAME VALUE 'OWNER' TO 'owner';
ALTER TYPE "StaffRole" RENAME VALUE 'MANAGER' TO 'manager';
ALTER TYPE "StaffRole" RENAME VALUE 'CASHIER' TO 'cashier';
ALTER TABLE "staff" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "staff" ALTER COLUMN "role" SET DEFAULT 'cashier'::"StaffRole";

-- OrderStatus
ALTER TYPE "OrderStatus" RENAME VALUE 'DRAFT' TO 'draft';
ALTER TYPE "OrderStatus" RENAME VALUE 'ACTIVE' TO 'active';
ALTER TYPE "OrderStatus" RENAME VALUE 'COMPLETED' TO 'completed';
ALTER TYPE "OrderStatus" RENAME VALUE 'CANCELED' TO 'canceled';
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'draft'::"OrderStatus";

-- ProductKind
ALTER TYPE "ProductKind" RENAME VALUE 'SIMPLE' TO 'simple';
ALTER TYPE "ProductKind" RENAME VALUE 'COMPOSED' TO 'composed';
ALTER TABLE "products" ALTER COLUMN "kind" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "kind" SET DEFAULT 'simple'::"ProductKind";

-- CompositionSlotMode (values are EXTRAS | PRODUCTS after prior migrations)
ALTER TYPE "CompositionSlotMode" RENAME VALUE 'EXTRAS' TO 'extras';
ALTER TYPE "CompositionSlotMode" RENAME VALUE 'PRODUCTS' TO 'products';
ALTER TABLE "composition_types" ALTER COLUMN "mode" DROP DEFAULT;
ALTER TABLE "composition_types" ALTER COLUMN "mode" SET DEFAULT 'extras'::"CompositionSlotMode";
