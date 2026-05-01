import type { PrismaClient as RegistryPrismaClient } from '../db/registry-client';

export function normalizeStaffLoginEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Upsert routing row by (tenant, staff). Email must be unique platform-wide. */
export async function upsertStaffLoginDirectory(
  registry: RegistryPrismaClient,
  tenantId: string,
  staffId: string,
  email: string,
): Promise<void> {
  const emailNormalized = normalizeStaffLoginEmail(email);
  await registry.staffLoginDirectory.upsert({
    where: { tenantId_staffId: { tenantId, staffId } },
    create: { emailNormalized, tenantId, staffId },
    update: { emailNormalized },
  });
}

export async function removeStaffLoginDirectory(
  registry: RegistryPrismaClient,
  tenantId: string,
  staffId: string,
): Promise<void> {
  await registry.staffLoginDirectory.deleteMany({
    where: { tenantId, staffId },
  });
}

/** True if another staff already owns this normalized email in the directory. */
export async function isStaffLoginEmailTakenElsewhere(
  registry: RegistryPrismaClient,
  emailNormalized: string,
  tenantId: string,
  staffId: string,
): Promise<boolean> {
  const row = await registry.staffLoginDirectory.findUnique({
    where: { emailNormalized },
  });
  if (!row) return false;
  return !(row.tenantId === tenantId && row.staffId === staffId);
}
