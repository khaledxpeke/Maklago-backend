-- Owner-controlled from mobile app: whether PIN gate applies on mobile when a PIN exists (backoffice still sets/removes PIN).
ALTER TABLE "staff" ADD COLUMN "pin_mobile_enabled" BOOLEAN NOT NULL DEFAULT true;
