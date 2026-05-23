-- CreateEnum
CREATE TYPE "ActivityEntityType" AS ENUM ('order');

-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM (
  'order_created',
  'order_updated',
  'order_status_changed',
  'order_payment_recorded',
  'order_table_changed'
);

-- CreateTable
CREATE TABLE "activity_logs" (
  "id" TEXT NOT NULL,
  "staff_id" TEXT NOT NULL,
  "action" "ActivityAction" NOT NULL,
  "entity_type" "ActivityEntityType" NOT NULL,
  "entity_id" TEXT NOT NULL,
  "summary" TEXT,
  "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activity_logs_entity_type_entity_id_created_at_idx" ON "activity_logs"("entity_type", "entity_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "activity_logs_created_at_idx" ON "activity_logs"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
