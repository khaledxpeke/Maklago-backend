/**
 * After `prisma migrate deploy` applies `uuid_entity_ids_to_twelve_hex` on a tenant database,
 * registry `staff_login_directory.staff_id` must match the new staff primary keys.
 *
 * Uses the same mapping as SQL: md5('staff' || oldUuid) → first 12 lowercase hex chars.
 *
 * Usage: REGISTRY_DATABASE_URL=... npx ts-node src/scripts/syncRegistryStaffIdsAfterTenantMigration.ts
 */
import 'dotenv/config';
import crypto from 'node:crypto';
import { getRegistryClient } from '../db/registry';

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function staffPublicIdFromLegacyUuid(oldId: string): string {
  return crypto.createHash('md5').update(`staff${oldId}`).digest('hex').slice(0, 12);
}

async function main(): Promise<void> {
  if (!process.env.REGISTRY_DATABASE_URL) {
    throw new Error('REGISTRY_DATABASE_URL must be set');
  }
  const registry = getRegistryClient();
  const rows = await registry.staffLoginDirectory.findMany({});
  let updated = 0;
  for (const row of rows) {
    if (!UUID_V4.test(row.staffId)) continue;
    const nextId = staffPublicIdFromLegacyUuid(row.staffId);
    await registry.staffLoginDirectory.update({
      where: { id: row.id },
      data: { staffId: nextId },
    });
    updated += 1;
  }
  console.log(`staff_login_directory: updated ${updated} row(s) from UUID staff ids to 12-char hex.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
