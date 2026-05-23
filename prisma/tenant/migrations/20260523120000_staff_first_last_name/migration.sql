-- Split staff.full_name into first_name + last_name.
ALTER TABLE "staff" ADD COLUMN "first_name" TEXT;
ALTER TABLE "staff" ADD COLUMN "last_name" TEXT;

UPDATE "staff"
SET
  "first_name" = CASE
    WHEN position(' ' IN "full_name") > 0 THEN split_part("full_name", ' ', 1)
    ELSE "full_name"
  END,
  "last_name" = CASE
    WHEN position(' ' IN "full_name") > 0 THEN substring("full_name" FROM position(' ' IN "full_name") + 1)
    ELSE ''
  END;

ALTER TABLE "staff" ALTER COLUMN "first_name" SET NOT NULL;
ALTER TABLE "staff" ALTER COLUMN "last_name" SET NOT NULL;
ALTER TABLE "staff" DROP COLUMN "full_name";
