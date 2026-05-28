import { describe, expect, it } from 'vitest';
import { computeShiftTotals } from './cashShift';

describe('computeShiftTotals', () => {
  it('sums completed orders only for grand total', () => {
    const totals = computeShiftTotals([
      {
        status: 'completed',
        paymentMethod: 'cash',
        totalCents: 1000,
        subtotalCents: 900,
        taxCents: 100,
      },
      {
        status: 'confirmed',
        paymentMethod: 'unpaid',
        totalCents: 500,
        subtotalCents: 450,
        taxCents: 50,
      },
      {
        status: 'completed',
        paymentMethod: 'card',
        totalCents: 2000,
        subtotalCents: 1800,
        taxCents: 200,
      },
    ]);

    expect(totals.orderCount).toBe(3);
    expect(totals.completedCount).toBe(2);
    expect(totals.grandTotal).toBe(30);
    expect(totals.cashTotal).toBe(10);
    expect(totals.cardTotal).toBe(20);
  });
});
