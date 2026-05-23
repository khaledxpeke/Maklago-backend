import type { OrderStatus, PaymentMethod, Prisma, PrismaClient } from '../db/tenant-client';
import { majorToCents, centsToMajor } from '../http/money';
import { orderDetailInclude, type SerializableOrder } from './orderJson';
import { generatePublicId } from './publicId';
import { effectiveTaxBps, taxCentsFromSubtotal } from './pricing';
import { getDefaultTaxBps } from './settings';

export const EDITABLE_ORDER_STATUSES: OrderStatus[] = ['confirmed', 'preparing', 'waiting'];

export type OrderCartExtraInput = {
  id: string;
  count: number;
  price: number;
};

export type OrderCartProductInput = {
  categoryId: string;
  id: string;
  count: number;
  price: number;
  extras?: OrderCartExtraInput[];
};

export type OrderCartLineRow = {
  productId: string;
  categoryId: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
  taxCents: number;
  modifiersSnapshot: unknown | null;
  compositionSnapshot: unknown | null;
  extrasSnapshot: { id: string; count: number; price: number }[];
};

export class ProductNotFoundError extends Error {
  constructor(public productId: string) {
    super('product_not_found');
    this.name = 'ProductNotFoundError';
  }
}

export class CategoryMismatchError extends Error {
  constructor(
    public productId: string,
    public sentCategoryId: string,
    public actualCategoryId: string,
  ) {
    super('category_mismatch');
    this.name = 'CategoryMismatchError';
  }
}

export class TotalsMismatchError extends Error {
  constructor(
    public expected: { subtotal: number; tva: number; total: number },
    public received: { subtotal: number; tva: number; total: number },
  ) {
    super('totals_mismatch');
    this.name = 'TotalsMismatchError';
  }
}

function extrasChargeCents(extras: OrderCartExtraInput[]): number {
  let s = 0;
  for (const e of extras) {
    s += majorToCents(e.price) * Math.round(e.count);
  }
  return s;
}

/** Validates catalog rows, recomputes line/ticket totals (cents), checks client totals (major units). */
export async function buildOrderCartFromProducts(
  tx: Prisma.TransactionClient,
  inputProducts: OrderCartProductInput[],
  discountPercent: number,
  clientTotals: { subtotal: number; tva: number; total: number },
  defaultTaxBps: number,
): Promise<{
  lineRows: OrderCartLineRow[];
  subtotalCents: number;
  taxCents: number;
  discountPriceCents: number;
  totalCents: number;
}> {
  let subtotal = 0;
  let taxTotal = 0;
  const lineRows: OrderCartLineRow[] = [];

  for (const row of inputProducts) {
    const product = await tx.product.findFirst({
      where: { id: row.id, isActive: true },
    });
    if (!product) {
      throw new ProductNotFoundError(row.id);
    }
    if (product.categoryId !== row.categoryId) {
      throw new CategoryMismatchError(row.id, row.categoryId, product.categoryId);
    }

    const extras = row.extras ?? [];
    const extraSum = extrasChargeCents(extras);
    const unitPriceMajorCents = majorToCents(row.price);
    const lineTotalCents = row.count * unitPriceMajorCents + extraSum;
    const unitPriceCents = Math.round(lineTotalCents / row.count);
    const taxBps = effectiveTaxBps(product.taxRateBps, defaultTaxBps);
    const lineTax = taxCentsFromSubtotal(lineTotalCents, taxBps);
    subtotal += lineTotalCents;
    taxTotal += lineTax;

    lineRows.push({
      productId: product.id,
      categoryId: row.categoryId,
      quantity: row.count,
      unitPriceCents,
      lineTotalCents,
      taxCents: lineTax,
      modifiersSnapshot: null,
      compositionSnapshot: null,
      extrasSnapshot: extras.map((e) => ({
        id: e.id,
        count: e.count,
        price: majorToCents(e.price),
      })),
    });
  }

  const grossTotal = subtotal + taxTotal;
  const discountPriceCents = Math.round((grossTotal * discountPercent) / 100);
  const totalCents = grossTotal - discountPriceCents;

  if (
    majorToCents(clientTotals.subtotal) !== subtotal ||
    majorToCents(clientTotals.tva) !== taxTotal ||
    majorToCents(clientTotals.total) !== totalCents
  ) {
    throw new TotalsMismatchError(
      {
        subtotal: centsToMajor(subtotal),
        tva: centsToMajor(taxTotal),
        total: centsToMajor(totalCents),
      },
      clientTotals,
    );
  }

  return {
    lineRows,
    subtotalCents: subtotal,
    taxCents: taxTotal,
    discountPriceCents,
    totalCents,
  };
}

export type EditOrderInput = {
  products: OrderCartProductInput[];
  subtotal: number;
  tva: number;
  total: number;
  note?: string;
  customerName?: string;
  discount?: number;
};

/** Replace all lines and ticket totals on an open order. Resets payment to unpaid when the cart changes. */
export async function replaceOrderCart(
  prisma: PrismaClient,
  orderId: string,
  body: EditOrderInput,
): Promise<SerializableOrder> {
  const existing = await prisma.order.findUnique({ where: { id: orderId } });
  if (!existing) {
    throw new OrderNotFoundError();
  }
  if (!EDITABLE_ORDER_STATUSES.includes(existing.status)) {
    throw new OrderNotEditableError(existing.status);
  }

  const discount = body.discount ?? existing.discount;
  const defaultTax = await getDefaultTaxBps(prisma);

  return prisma.$transaction(async (tx) => {
    const cart = await buildOrderCartFromProducts(
      tx,
      body.products,
      discount,
      { subtotal: body.subtotal, tva: body.tva, total: body.total },
      defaultTax,
    );

    await tx.orderLine.deleteMany({ where: { orderId } });

    const resetPayment =
      existing.paymentMethod === 'cash' || existing.paymentMethod === 'card';

    return tx.order.update({
      where: { id: orderId },
      data: {
        note: body.note !== undefined ? body.note : existing.note,
        customerName:
          body.customerName !== undefined ? body.customerName : existing.customerName,
        discount,
        discountPriceCents: cart.discountPriceCents,
        subtotalCents: cart.subtotalCents,
        taxCents: cart.taxCents,
        totalCents: cart.totalCents,
        ...(resetPayment ? { paymentMethod: 'unpaid' satisfies PaymentMethod } : {}),
        cartRevision: { increment: 1 },
        lines: {
          create: cart.lineRows.map((r) => ({
            id: generatePublicId(),
            productId: r.productId,
            categoryId: r.categoryId,
            quantity: r.quantity,
            unitPriceCents: r.unitPriceCents,
            lineTotalCents: r.lineTotalCents,
            taxCents: r.taxCents,
            modifiersSnapshot: r.modifiersSnapshot ?? undefined,
            compositionSnapshot: r.compositionSnapshot ?? undefined,
            extrasSnapshot: r.extrasSnapshot as object,
          })),
        },
      },
      include: orderDetailInclude,
    });
  });
}

export class OrderNotFoundError extends Error {
  constructor() {
    super('not_found');
    this.name = 'OrderNotFoundError';
  }
}

export class OrderNotEditableError extends Error {
  constructor(public status: OrderStatus) {
    super('order_not_editable');
    this.name = 'OrderNotEditableError';
  }
}
