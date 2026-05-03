import { randomBytes } from 'node:crypto';
import { z } from 'zod';

/** 12 lowercase hex characters (6 bytes), Mongo ObjectId–style compact IDs. */
export const TENANT_PUBLIC_ID_LENGTH = 12;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function generatePublicId(): string {
  return randomBytes(TENANT_PUBLIC_ID_LENGTH / 2).toString('hex');
}

export function isTenantEntityId(value: string): boolean {
  return /^[0-9a-f]{12}$/i.test(value);
}

/** New public IDs (12 hex) or legacy UUID strings during coexistence. */
export const tenantEntityIdSchema = z
  .string()
  .min(12)
  .max(36)
  .refine((s) => isTenantEntityId(s) || UUID_RE.test(s), 'Invalid entity id');
