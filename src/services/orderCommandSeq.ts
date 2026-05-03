import type { Prisma } from '../db/tenant-client';

/** UTC calendar date used for daily `commandNumber` sequencing. */
export function utcCommandDate(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export async function nextCommandNumber(
  tx: Prisma.TransactionClient,
  commandDate: Date,
): Promise<number> {
  const agg = await tx.order.aggregate({
    where: { commandDate },
    _max: { commandNumber: true },
  });
  return (agg._max.commandNumber ?? 0) + 1;
}
