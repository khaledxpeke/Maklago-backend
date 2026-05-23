-- Cashier-created orders start confirmed; waiting reserved for future QR/web flows.
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'confirmed'::"OrderStatus";
