-- Split owners.full_name and platform_admins.full_name into first_name + last_name.
ALTER TABLE "owners" ADD COLUMN "first_name" TEXT;
ALTER TABLE "owners" ADD COLUMN "last_name" TEXT;

UPDATE "owners"
SET
  "first_name" = CASE
    WHEN position(' ' IN "full_name") > 0 THEN split_part("full_name", ' ', 1)
    ELSE "full_name"
  END,
  "last_name" = CASE
    WHEN position(' ' IN "full_name") > 0 THEN substring("full_name" FROM position(' ' IN "full_name") + 1)
    ELSE ''
  END;

ALTER TABLE "owners" ALTER COLUMN "first_name" SET NOT NULL;
ALTER TABLE "owners" ALTER COLUMN "last_name" SET NOT NULL;
ALTER TABLE "owners" DROP COLUMN "full_name";

ALTER TABLE "platform_admins" ADD COLUMN "first_name" TEXT;
ALTER TABLE "platform_admins" ADD COLUMN "last_name" TEXT;

UPDATE "platform_admins"
SET
  "first_name" = CASE
    WHEN position(' ' IN "full_name") > 0 THEN split_part("full_name", ' ', 1)
    ELSE "full_name"
  END,
  "last_name" = CASE
    WHEN position(' ' IN "full_name") > 0 THEN substring("full_name" FROM position(' ' IN "full_name") + 1)
    ELSE ''
  END;

ALTER TABLE "platform_admins" ALTER COLUMN "first_name" SET NOT NULL;
ALTER TABLE "platform_admins" ALTER COLUMN "last_name" SET NOT NULL;
ALTER TABLE "platform_admins" DROP COLUMN "full_name";
