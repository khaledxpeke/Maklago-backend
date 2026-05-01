/**
 * Scan every active tenant DB and upsert registry staff_login_directory rows for active staff.
 * Run after applying registry migration `staff_login_directory`: `npx ts-node src/scripts/backfillStaffLoginDirectory.ts`
 */
import 'dotenv/config';
import { getRegistryClient } from '../db/registry';
import { getTenantPrisma } from '../db/tenantPool';
import { upsertStaffLoginDirectory } from '../services/staffLoginDirectory';

async function main(): Promise<void> {
  if (!process.env.REGISTRY_DATABASE_URL) {
    throw new Error('REGISTRY_DATABASE_URL must be set');
  }

  const registry = getRegistryClient();
  const tenants = await registry.tenant.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, databaseUrl: true },
  });

  for (const t of tenants) {
    try {
      const prisma = getTenantPrisma(t.id, t.databaseUrl);
      const staff = await prisma.staff.findMany({
        where: { isActive: true },
        select: { id: true, email: true },
      });
      for (const s of staff) {
        await upsertStaffLoginDirectory(registry, t.id, s.id, s.email);
      }
      console.log(`Synced ${staff.length} staff route(s) for tenant ${t.slug}`);
    } catch (e) {
      console.error(`Skip tenant ${t.slug}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
