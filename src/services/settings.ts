import type { PrismaClient } from '../db/tenant-client';

const DEFAULT_TAX_BPS_KEY = 'default_tax_bps';

/** Basis points (1% = 100 bps). Default 1000 = 10% when unset. */
export async function getDefaultTaxBps(prisma: PrismaClient): Promise<number> {
  const row = await prisma.setting.findUnique({ where: { key: DEFAULT_TAX_BPS_KEY } });
  if (!row || row.value === null) return 1000;
  const v = row.value;
  if (typeof v === 'number' && Number.isFinite(v)) return Math.max(0, Math.round(v));
  if (typeof v === 'object' && v !== null && 'bps' in v && typeof (v as { bps: unknown }).bps === 'number') {
    return Math.max(0, Math.round((v as { bps: number }).bps));
  }
  return 1000;
}

export async function setDefaultTaxBps(prisma: PrismaClient, bps: number): Promise<void> {
  await prisma.setting.upsert({
    where: { key: DEFAULT_TAX_BPS_KEY },
    create: { key: DEFAULT_TAX_BPS_KEY, value: bps },
    update: { value: bps },
  });
}
