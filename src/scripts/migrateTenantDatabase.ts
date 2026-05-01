/**
 * Run tenant Prisma migrations against an arbitrary Postgres URL (e.g. a new restaurant DB).
 * Usage from repo root:
 *   npx ts-node src/scripts/migrateTenantDatabase.ts "postgresql://user:pass@host:5432/dbname"
 */
import { execSync } from 'node:child_process';

const url = process.argv[2];
if (!url) {
  console.error('Usage: npx ts-node src/scripts/migrateTenantDatabase.ts <TENANT_DATABASE_URL>');
  process.exit(1);
}

execSync('npx prisma migrate deploy --schema prisma/tenant/schema.prisma', {
  env: { ...process.env, TENANT_DATABASE_URL: url },
  stdio: 'inherit',
  cwd: process.cwd(),
});
