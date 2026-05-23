/** Money from API: Mongo used main currency units (Number); DB keeps integer cents. */

import { z } from 'zod';

export function normalizeMajorUnits(value: number): number {
  return Math.round(value * 100) / 100;
}

export function majorToCents(value: number): number {
  return Math.round(normalizeMajorUnits(value) * 100);
}

export function centsToMajor(cents: number): number {
  return normalizeMajorUnits(cents / 100);
}

export function resolvePriceCents(body: { price?: number; priceCents?: number }): number | null {
  if (body.priceCents !== undefined) return Math.round(body.priceCents);
  if (body.price !== undefined) return majorToCents(body.price);
  return null;
}

export function resolveOptionalCents(body: {
  valueMajor?: number;
  valueCents?: number;
}): number | undefined {
  if (body.valueCents !== undefined) return Math.round(body.valueCents);
  if (body.valueMajor !== undefined) return majorToCents(body.valueMajor);
  return undefined;
}

/** Zod: decimal major units in JSON (e.g. 2.5 TND). Coerces numeric strings from clients. */
export const moneyMajorSchema = z.coerce.number().min(0).transform(normalizeMajorUnits);

/** Order-level discount percent 0–100 (whole units; decimals like 10.0 accepted). */
export const discountPercentSchema = z.coerce.number().min(0).max(100).transform((v) => Math.round(v));
