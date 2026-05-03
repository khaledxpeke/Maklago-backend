import type { Request } from 'express';
import type { Order, OrderLine, Prisma, PrismaClient, Product, RestaurantTable, Staff } from '../db/tenant-client';
import { resolveImageForClient } from '../http/imageUrl';

/** Product row for slim/mobile payloads and POST/create DB load (receipts need `name`). */
export const orderLineProductSelect = {
  id: true,
  name: true,
} as const;

/** Backoffice GET: product + category display fields. */
export const orderLineProductEnrichedSelect = {
  id: true,
  name: true,
  description: true,
  kind: true,
  image: true,
  categoryId: true,
  category: { select: { id: true, name: true } },
} as const;

/** Lines + table + staff — POST create / PATCH load / **mobile** GET (slim JSON). */
export const orderDetailInclude = {
  lines: {
    include: {
      product: { select: orderLineProductSelect },
    },
  },
  table: true,
  staff: true,
} as const;

/** **Backoffice** GET list/detail — joins catalog fields on each line. */
export const orderEnrichedInclude = {
  lines: {
    include: {
      product: { select: orderLineProductEnrichedSelect },
    },
  },
  table: true,
  staff: true,
} as const;

export type OrderLineProductRow = Pick<Product, 'id' | 'name'>;

export type OrderLineProductEnrichedRow = Pick<
  Product,
  'id' | 'name' | 'description' | 'kind' | 'image' | 'categoryId'
> & {
  category: { id: string; name: string };
};

export type SerializableOrder = Order & {
  lines: (OrderLine & { product: OrderLineProductRow })[];
  table?: RestaurantTable | null;
  staff?: Staff | null;
};

export type SerializableOrderEnriched = Order & {
  lines: (OrderLine & { product: OrderLineProductEnrichedRow })[];
  table?: RestaurantTable | null;
  staff?: Staff | null;
};

type TenantDb = PrismaClient | Prisma.TransactionClient;

/** Σ(extra.price × extra.count) from stored snapshot (same integer unit as DB `extras_snapshot`). */
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

function collectExtraIdsFromSnapshot(raw: unknown, into: Set<string>): void {
  if (!Array.isArray(raw)) return;
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const o = item as Record<string, unknown>;
    const exId = typeof o.id === 'string' ? o.id : typeof o._id === 'string' ? o._id : '';
    if (exId) into.add(exId);
  }
}

function collectExtraIdsFromOrders(orders: { lines: OrderLine[] }[], into: Set<string>): void {
  for (const o of orders) {
    for (const line of o.lines) {
      collectExtraIdsFromSnapshot(line.extrasSnapshot, into);
    }
  }
}

/** Line extras snapshot only: `id`, `count`, `price`. */
function serializeExtrasForOrderLine(raw: unknown): { id: string; count: number; price: number }[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item !== 'object' || item === null) return { id: '', count: 1, price: 0 };
    const o = item as Record<string, unknown>;
    const exId = typeof o.id === 'string' ? o.id : typeof o._id === 'string' ? o._id : '';
    const count = typeof o.count === 'number' && Number.isFinite(o.count) ? Math.round(o.count) : 1;
    const price = typeof o.price === 'number' && Number.isFinite(o.price) ? Math.round(o.price) : 0;
    return { id: exId, count, price };
  });
}

function serializeExtrasEnriched(
  raw: unknown,
  extraById: Map<string, { name: string }>,
): { id: string; count: number; price: number; name?: string }[] {
  return serializeExtrasForOrderLine(raw).map((row) => {
    const cat = row.id ? extraById.get(row.id) : undefined;
    return cat ? { ...row, name: cat.name } : row;
  });
}

function serializeOrderLineSlim(line: OrderLine & { product: OrderLineProductRow }): Record<string, unknown> {
  const qty = Math.max(1, line.quantity);
  const extrasCharge = extrasChargeFromSnapshot(line.extrasSnapshot);
  const baseUnitPrice = Math.round((line.lineTotalCents - extrasCharge) / qty);

  const row: Record<string, unknown> = {
    categoryId: line.categoryId,
    id: line.product.id,
    count: line.quantity,
    price: baseUnitPrice,
    extras: serializeExtrasForOrderLine(line.extrasSnapshot),
  };

  if (line.compositionSnapshot != null) {
    row.compositionSnapshot = line.compositionSnapshot;
  }

  return row;
}

function serializeOrderLineEnriched(
  req: Request,
  line: OrderLine & { product: OrderLineProductEnrichedRow },
  extraById: Map<string, { name: string }>,
): Record<string, unknown> {
  const qty = Math.max(1, line.quantity);
  const extrasCharge = extrasChargeFromSnapshot(line.extrasSnapshot);
  const baseUnitPrice = Math.round((line.lineTotalCents - extrasCharge) / qty);
  const p = line.product;

  const row: Record<string, unknown> = {
    categoryId: line.categoryId,
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    kind: p.kind,
    categoryName: p.category.name,
    image: resolveImageForClient(req, p.image),
    count: line.quantity,
    price: baseUnitPrice,
    extras: serializeExtrasEnriched(line.extrasSnapshot, extraById),
  };

  if (line.compositionSnapshot != null) {
    row.compositionSnapshot = line.compositionSnapshot;
  }

  return row;
}

function attachOrderShell(
  order: Order & { table?: RestaurantTable | null; staff?: Staff | null },
  products: unknown[],
): Record<string, unknown> {
  const omitTable =
    order.orderType === 'takeaway' || order.tableId == null;

  const base: Record<string, unknown> = {
    id: order.id,
    reference: order.reference,
    commandNumber: order.commandNumber,
    commandDate: order.commandDate,
    status: order.status,
    orderType: order.orderType,
    ...(omitTable ? {} : { tableId: order.tableId }),
    staffId: order.staffId,
    note: order.note ?? '',
    customerName: order.customerName ?? null,
    discount: order.discount,
    discountPrice: order.discountPriceCents,
    paymentMethod: order.paymentMethod,
    subtotal: order.subtotalCents,
    tva: order.taxCents,
    total: order.totalCents,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    products,
  };

  if (!omitTable && order.table != null) {
    base.table = {
      id: order.table.id,
      name: order.table.name,
      tableNumber: order.table.tableNumber,
      zone: order.table.zone,
      sortOrder: order.table.sortOrder,
      status: order.table.status,
      isActive: order.table.isActive,
      createdAt: order.table.createdAt,
    };
  }

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

/**
 * **Mobile / realtime / POST response**: slim lines (ids + amounts); matches websocket payloads.
 * **`tableId`** / **`table`** omitted for takeaway or null table assignment.
 */
export function serializeOrdersSlim(orders: SerializableOrder[]): Record<string, unknown>[] {
  return orders.map((o) =>
    attachOrderShell(o, o.lines.map((l) => serializeOrderLineSlim(l))),
  );
}

export function serializeOrderSlim(order: SerializableOrder): Record<string, unknown> {
  return attachOrderShell(order, order.lines.map((l) => serializeOrderLineSlim(l)));
}

/** **Backoffice GET**: catalog labels on lines + extra names (batch-loaded). */
export async function serializeOrdersEnriched(
  req: Request,
  prisma: TenantDb,
  orders: SerializableOrderEnriched[],
): Promise<Record<string, unknown>[]> {
  const extraIds = new Set<string>();
  collectExtraIdsFromOrders(orders, extraIds);

  const rows =
    extraIds.size > 0
      ? await prisma.extra.findMany({
          where: { id: { in: [...extraIds] } },
          select: { id: true, name: true },
        })
      : [];

  const extraById = new Map(rows.map((e) => [e.id, e]));

  return orders.map((o) =>
    attachOrderShell(
      o,
      o.lines.map((l) => serializeOrderLineEnriched(req, l, extraById)),
    ),
  );
}

export async function serializeOrderEnriched(
  req: Request,
  prisma: TenantDb,
  order: SerializableOrderEnriched,
): Promise<Record<string, unknown>> {
  const [one] = await serializeOrdersEnriched(req, prisma, [order]);
  return one!;
}

/** For tests/scripts that only need raw `{ id, count, price }` rows from a snapshot. */
export function serializeExtrasSnapshotPlain(
  raw: unknown,
): { id: string; count: number; price: number }[] {
  return serializeExtrasForOrderLine(raw);
}
