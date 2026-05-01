-- Remove redundant `choice` column; catalog uses `kind` only (API has no `choice` field).
ALTER TABLE "products" DROP COLUMN "choice";

DROP TYPE "ProductChoice";
