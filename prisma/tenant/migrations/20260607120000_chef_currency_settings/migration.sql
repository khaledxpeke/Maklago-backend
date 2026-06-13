-- AlterEnum: add chef role
ALTER TYPE "StaffRole" ADD VALUE 'chef';

-- CreateTable: currencies
CREATE TABLE "currencies" (
  "id" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "symbol" TEXT NOT NULL,
  CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- Seed: 3 default currencies
INSERT INTO "currencies" ("id", "code", "name", "symbol") VALUES
  ('curr_usd', 'USD', 'Dollar', '$'),
  ('curr_eur', 'EUR', 'Euro', '€'),
  ('curr_tnd', 'TND', 'Dinar Tunisien', 'DT');

-- Restaurant settings are stored in the existing "settings" KV table (open_time, close_time, currency_id keys).
-- No new table needed.
