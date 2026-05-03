import { randomBytes } from 'node:crypto';
import type { Prisma } from '../db/tenant-client';

const REF_HEX_CHARS = 8;
const ALLOC_ATTEMPTS = 16;

/** Cryptographic 8-character lowercase hexadecimal ticket reference (4 bytes). */
export function generateOrderReference(): string {
  return randomBytes(REF_HEX_CHARS / 2).toString('hex');
}

/** Allocate a `reference` value not yet used in this tenant DB (retry on collision). */
export async function allocateUniqueOrderReference(
  tx: Prisma.TransactionClient,
): Promise<string> {
  for (let i = 0; i < ALLOC_ATTEMPTS; i++) {
    const ref = generateOrderReference();
    const existing = await tx.order.findUnique({
      where: { reference: ref },
      select: { id: true },
    });
    if (!existing) return ref;
  }
  throw new Error('order_reference_exhausted');
}
