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
    _id: p.id,
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

function enrichModifiersSnapshot(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object') return raw;
  const o = raw as Record<string, unknown>;
  const defs = o.defs;
  if (!Array.isArray(defs)) return raw;
  const newDefs = defs.map((d) => {
    if (typeof d !== 'object' || d === null) return d;
    const x = d as Record<string, unknown>;
    const id = typeof x.id === 'string' ? x.id : '';
    const cents =
      typeof x.priceCents === 'number' && Number.isFinite(x.priceCents)
        ? Math.round(x.priceCents)
        : typeof x.price === 'number' && Number.isFinite(x.price)
          ? Math.round(x.price * 100)
          : 0;
    return {
      ...x,
      _id: id,
      id,
      priceCents: cents,
      price: cents / 100,
    };
  });
  return { ...o, defs: newDefs };
}

function enrichCompositionSnapshot(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object') return raw;
  const steps = (raw as { steps?: unknown }).steps;
  if (!Array.isArray(steps)) return raw;
  const nextSteps = steps.map((s) => {
    if (typeof s !== 'object' || s === null) return s;
    const step = s as Record<string, unknown>;
    const tid = step.compositionTypeId;
    const typeId = typeof tid === 'string' ? tid : '';
    const extras = step.extras;
    let newExtras = extras;
    if (Array.isArray(extras)) {
      newExtras = extras.map((e) => {
        if (typeof e !== 'object' || e === null) return e;
        const ex = e as Record<string, unknown>;
        const id = typeof ex.id === 'string' ? ex.id : '';
        const cents =
          typeof ex.extraCents === 'number' && Number.isFinite(ex.extraCents)
            ? Math.round(ex.extraCents)
            : typeof ex.priceCents === 'number' && Number.isFinite(ex.priceCents)
              ? Math.round(ex.priceCents)
              : 0;
        return {
          ...ex,
          _id: id,
          id,
          extraCents: cents,
          priceCents: cents,
          price: cents / 100,
        };
      });
    }
    return {
      ...step,
      _id: typeId,
      id: typeId,
      extras: newExtras,
    };
  });
  return { ...(raw as object), steps: nextSteps };
}

export function serializeOrderLine(req: Request, line: OrderLine & { product: OrderLineProductRow }) {
  const unit = line.unitPriceCents;
  const lineTot = line.lineTotalCents;
  const tax = line.taxCents;
  return {
    _id: line.id,
    id: line.id,
    orderId: line.orderId,
    productId: line.productId,
    quantity: line.quantity,
    unitPriceCents: unit,
    unitPrice: unit / 100,
    lineTotalCents: lineTot,
    lineTotal: lineTot / 100,
    taxCents: tax,
    tax: tax / 100,
    note: line.note,
    modifiersSnapshot: enrichModifiersSnapshot(line.modifiersSnapshot),
    compositionSnapshot: enrichCompositionSnapshot(line.compositionSnapshot),
    product: orderProductSummary(req, line.product),
  };
}

export function serializeOrder(req: Request, order: SerializableOrder) {
  const sub = order.subtotalCents;
  const tax = order.taxCents;
  const tot = order.totalCents;
  const base: Record<string, unknown> = {
    _id: order.id,
    id: order.id,
    status: order.status,
    fulfillment: order.fulfillment,
    tableId: order.tableId,
    staffId: order.staffId,
    sessionId: order.sessionId,
    subtotalCents: sub,
    subtotal: sub / 100,
    taxCents: tax,
    tax: tax / 100,
    totalCents: tot,
    total: tot / 100,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    commandNumber: order.commandNumber,
    currency: order.currency,
    pack: order.pack,
    paymentMethod: order.paymentMethod,
    orderDiscountValue: order.orderDiscountValue,
    logoPath: order.logoPath,
    idempotencyKey: order.idempotencyKey,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    lines: order.lines.map((l) => serializeOrderLine(req, l)),
  };

  base.table =
    order.table != null
      ? {
          _id: order.table.id,
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
          _id: order.staff.id,
          id: order.staff.id,
          fullName: order.staff.fullName,
          email: order.staff.email,
          role: order.staff.role,
        }
      : null;
  }

  return base;
}
