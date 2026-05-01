import type { Prisma } from '../db/tenant-client';

/**
 * Pricing rules (ported from kiosk / Tacos Korner-style backends):
 * line money = (base unit price + selected modifier surcharges) × quantity;
 * tax is computed per line from effective tax bps (product override or tenant default).
 */

export type ModifierDef = {
  id: string;
  name: string;
  /** Surcharge in cents (from Mongo `price` major units or `priceCents`). */
  priceCents?: number;
};

export function parseModifiersJson(raw: Prisma.JsonValue | null | undefined): ModifierDef[] {
  if (raw === null || raw === undefined) return [];
  if (!Array.isArray(raw)) return [];
  const out: ModifierDef[] = [];
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const o = item as Record<string, unknown>;
    if (typeof o.id !== 'string' || typeof o.name !== 'string') continue;
    let surcharge = 0;
    if (typeof o.priceCents === 'number' && Number.isFinite(o.priceCents)) {
      surcharge = Math.round(o.priceCents);
    } else if (typeof o.price === 'number' && Number.isFinite(o.price)) {
      surcharge = Math.round(o.price * 100);
    }
    out.push({ id: o.id, name: o.name, priceCents: surcharge });
  }
  return out;
}

export function modifierDeltaCents(modifiers: ModifierDef[], selectedIds: string[]): number {
  const set = new Set(selectedIds);
  let sum = 0;
  for (const m of modifiers) {
    if (set.has(m.id)) sum += m.priceCents ?? 0;
  }
  return sum;
}

export function effectiveTaxBps(productTaxBps: number | null, defaultTaxBps: number): number {
  if (productTaxBps !== null && productTaxBps !== undefined && Number.isFinite(productTaxBps)) {
    return Math.max(0, Math.round(productTaxBps));
  }
  return Math.max(0, Math.round(defaultTaxBps));
}

export function lineSubtotalCents(unitPriceCents: number, quantity: number, modifierExtraCents: number): number {
  const unit = Math.max(0, Math.round(unitPriceCents)) + Math.max(0, modifierExtraCents);
  const qty = Math.max(1, Math.round(quantity));
  return unit * qty;
}

export function taxCentsFromSubtotal(subtotalCents: number, taxBps: number): number {
  return Math.round((Math.max(0, subtotalCents) * Math.max(0, taxBps)) / 10000);
}
