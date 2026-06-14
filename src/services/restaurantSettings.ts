import type { Prisma, PrismaClient } from '../db/tenant-client';

type TenantDb = PrismaClient | Prisma.TransactionClient;

const DEFAULT_OPEN_TIME = '12:00';
const DEFAULT_CLOSE_TIME = '01:00';
const DEFAULT_CURRENCY_ID = 'curr_tnd';
/** Default TVA rate in basis points: 1900 bps = 19% */
const DEFAULT_TAX_BPS = 1900;
const TAX_BPS_KEY = 'default_tax_bps';

function settingString(value: Prisma.JsonValue, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

/** Convert basis points → percentage (e.g. 1900 → 19). */
export function bpsToPercent(bps: number): number {
  return Math.round(bps) / 100;
}

/** Convert percentage → basis points (e.g. 19 → 1900). Clamps to [0, 100]. */
export function percentToBps(pct: number): number {
  return Math.round(Math.min(100, Math.max(0, pct)) * 100);
}

function settingBps(value: Prisma.JsonValue | undefined | null, fallback: number): number {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.round(value));
  if (typeof value === 'object' && 'bps' in (value as object) && typeof (value as { bps: unknown }).bps === 'number') {
    return Math.max(0, Math.round((value as { bps: number }).bps));
  }
  return fallback;
}

/**
 * Resolve the start of the current business session from an "HH:mm" open time.
 * If the current local time is before today's open time, the session started yesterday.
 */
export function resolveSessionStart(openTime: string): Date {
  const [hStr, mStr] = openTime.split(':');
  const h = parseInt(hStr!, 10);
  const m = parseInt(mStr!, 10);

  const now = new Date();
  const todayOpen = new Date(now);
  todayOpen.setHours(h, m, 0, 0);

  if (now >= todayOpen) {
    return todayOpen;
  }

  const yesterdayOpen = new Date(todayOpen);
  yesterdayOpen.setDate(yesterdayOpen.getDate() - 1);
  return yesterdayOpen;
}

/** Read restaurant settings from the shared KV store, returning defaults when keys are missing. */
export async function getRestaurantSettings(prisma: TenantDb) {
  const rows = await (prisma as PrismaClient).setting.findMany({
    where: { key: { in: ['open_time', 'close_time', 'currency_id', TAX_BPS_KEY] } },
  });

  const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const openTime = settingString(byKey['open_time'] ?? null, DEFAULT_OPEN_TIME);
  const closeTime = settingString(byKey['close_time'] ?? null, DEFAULT_CLOSE_TIME);
  const currencyId = settingString(byKey['currency_id'] ?? null, DEFAULT_CURRENCY_ID);
  const taxBps = settingBps(byKey[TAX_BPS_KEY] ?? null, DEFAULT_TAX_BPS);

  const currency = await (prisma as PrismaClient).currency.findFirstOrThrow({
    where: { id: currencyId },
  });

  return { openTime, closeTime, currency, taxBps, tva: bpsToPercent(taxBps) };
}

export async function upsertRestaurantSettings(
  prisma: TenantDb,
  data: { openTime?: string; closeTime?: string; currencyId?: string; tva?: number },
) {
  const updates: Array<{ key: string; value: string | number }> = [];
  if (data.openTime !== undefined) updates.push({ key: 'open_time', value: data.openTime });
  if (data.closeTime !== undefined) updates.push({ key: 'close_time', value: data.closeTime });
  if (data.currencyId !== undefined) updates.push({ key: 'currency_id', value: data.currencyId });
  if (data.tva !== undefined) updates.push({ key: TAX_BPS_KEY, value: percentToBps(data.tva) });

  await Promise.all(
    updates.map(({ key, value }) =>
      (prisma as PrismaClient).setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      }),
    ),
  );

  return getRestaurantSettings(prisma);
}
