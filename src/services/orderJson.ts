import type { Request } from 'express';
import type { Order, OrderLine, Product, RestaurantTable, Staff } from '../db/tenant-client';
import { resolveImageForClient } from '../http/imageUrl';

/** Product fields loaded for order line responses (aligned with catalog `productToJson`). */
export const orderLineProductSelect = {
  id: true,
  name: true,
  description: true,
  kind: true,
  image: true,
  categoryId: true,
  price: true,
  taxRateBps: true,
  category: { select: { id: true, name: true } },
} as const;

/** Lines + product shape + table for order list responses. */
export const orderListInclude = {
  lines: {
    include: {
      product: { select: orderLineProductSelect },
    },
  },
  table: true,
} as const;

/** Same as list plus staff (detail / create / status patch). */
export const orderDetailInclude = {
  lines: {
    include: {
      product: { select: orderLineProductSelect },
    },
  },
  table: true,
  staff: true,
} as const;

export type OrderLineProductRow = Pick<
  Product,
  'id' | 'name' | 'description' | 'kind' | 'image' | 'categoryId' | 'price' | 'taxRateBps'
> & {
  category: { id: string; name: string };
};

/** Order row as loaded from Prisma with catalog-aligned product on each line; table/staff optional when omitted from include. */
export type SerializableOrder = Order & {
  lines: (OrderLine & { product: OrderLineProductRow })[];
  table?: RestaurantTable | null;
  staff?: Staff | null;
};

function orderProductSummary(req: Request, p: OrderLineProductRow): Record<string, unknown> {
  return {
    id: p.id,
    categoryId: p.categoryId,
    categoryName: p.category.name,
    categories: [p.categoryId],
    name: p.name,
    description: p.description ?? null,
    kind: p.kind,
    priceCents: p.price,
    price: p.price / 100,
    taxRateBps: p.taxRateBps,
    tva: p.taxRateBps != null ? p.taxRateBps / 100 : null,
    image: resolveImageForClient(req, p.image),
  };
}

/** Σ(extra.price × extra.count) from stored snapshot (cents). */
function extrasChargeFromSnapshot(raw: unknown): number {
  if (!Array.isArray(raw)) return 0;
  let s = 0;
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const o = item as Record<string, unknown>;
    const price = typeof o.price === 'number' && Number.isFinite(o.price) ? Math.round(o.price) : 0;
    const count = typeof o.count === 'number' && Number.isFinite(o.count) ? Math.round(o.count) : 0;
    s += price * count;
  }
  return s;
}

function serializeExtrasSnapshot(raw: unknown): unknown {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item !== 'object' || item === null) return item;
    const o = item as Record<string, unknown>;
    const exId = typeof o.id === 'string' ? o.id : typeof o._id === 'string' ? o._id : '';
    const count = typeof o.count === 'number' && Number.isFinite(o.count) ? Math.round(o.count) : 1;
    const priceCents =
      typeof o.price === 'number' && Number.isFinite(o.price) ? Math.round(o.price) : 0;
    return {
      id: exId,
      count,
      priceCents,
      price: priceCents / 100,
    };
  });
}

/** One saved product row plus tax/line totals and catalog `product`. */
export function serializeOrderProduct(req: Request, line: OrderLine & { product: OrderLineProductRow }) {
  const qty = Math.max(1, line.quantity);
  const extrasCharge = extrasChargeFromSnapshot(line.extrasSnapshot);
  const baseUnitPriceCents = Math.round((line.lineTotalCents - extrasCharge) / qty);
  const lineTot = line.lineTotalCents;
  const tax = line.taxCents;

  return {
    id: line.id,
    orderId: line.orderId,
    categoryId: line.categoryId,
    count: line.quantity,
    priceCents: baseUnitPriceCents,
    price: baseUnitPriceCents / 100,
    extras: serializeExtrasSnapshot(line.extrasSnapshot),
    lineTotalCents: lineTot,
    lineTotal: lineTot / 100,
    taxCents: tax,
    tax: tax / 100,
    note: line.note,
    product: orderProductSummary(req, line.product),
  };
}

export function serializeOrder(req: Request, order: SerializableOrder) {
  const sub = order.subtotalCents;
  const tax = order.taxCents;
  const tot = order.totalCents;
  const base: Record<string, unknown> = {
    id: order.id,
    reference: order.reference,
    commandNumber: order.commandNumber,
    commandDate: order.commandDate,
    status: order.status,
    orderType: order.orderType,
    tableId: order.tableId,
    staffId: order.staffId,
    note: order.note,
    customerName: order.customerName,
    discount: order.discount,
    discountPriceCents: order.discountPriceCents,
    discountPrice: order.discountPriceCents / 100,
    subtotalCents: sub,
    subtotal: sub / 100,
    taxCents: tax,
    tax: tax / 100,
    totalCents: tot,
    total: tot / 100,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    products: order.lines.map((l) => serializeOrderProduct(req, l)),
  };

  base.table =
    order.table != null
      ? {
          id: order.table.id,
          name: order.table.name,
          tableNumber: order.table.tableNumber,
          zone: order.table.zone,
          sortOrder: order.table.sortOrder,
          status: order.table.status,
          isActive: order.table.isActive,
          createdAt: order.table.createdAt,
        }
      : null;

  if (order.staff !== undefined) {
    base.staff = order.staff
      ? {
          id: order.staff.id,
          fullName: order.staff.fullName,
          email: order.staff.email,
          role: order.staff.role,
        }
      : null;
  }

  return base;
}
