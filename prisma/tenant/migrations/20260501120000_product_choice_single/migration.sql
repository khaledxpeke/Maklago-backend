-- Rename ProductChoice enum label SEUL -> SINGLE (PostgreSQL 10+).
ALTER TYPE "ProductChoice" RENAME VALUE 'SEUL' TO 'SINGLE';

ALTER TABLE "products" ALTER COLUMN "choice" SET DEFAULT 'SINGLE'::"ProductChoice";
