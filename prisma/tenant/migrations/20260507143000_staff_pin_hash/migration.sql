-- Optional 4-digit owner PIN (stored hashed); verified after login for sensitive actions.
ALTER TABLE "staff" ADD COLUMN "pin_hash" TEXT;
