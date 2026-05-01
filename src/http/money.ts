/** Money from API: Mongo used main currency units (Number); DB keeps integer cents. */

export function majorToCents(value: number): number {
  return Math.round(value * 100);
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
