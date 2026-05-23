import type { Order, OrderLine, Prisma, PrismaClient, Product, RestaurantTable, TableZone } from '../db/tenant-client';
import {
  loadMobileCompositionContext,
  orderLineProductSelect,
  type SerializableOrder,
} from './orderJson';

type TenantDb = PrismaClient | Prisma.TransactionClient;

type KitchenLineProduct = Pick<Product, 'id' | 'name'>;

type KitchenOrderRow = Order & {
  lines: (OrderLine & { product: KitchenLineProduct })[];
  table?: (RestaurantTable & { zone: TableZone | null }) | null;
};

function collectExtraIds(lines: OrderLine[], into: Set<string>): void {
  for (const line of lines) {
    if (!Array.isArray(line.extrasSnapshot)) continue;
    for (const item of line.extrasSnapshot) {
      if (typeof item !== 'object' || item === null) continue;
      const o = item as Record<string, unknown>;
      const id = typeof o.id === 'string' ? o.id : typeof o._id === 'string' ? o._id : '';
      if (id) into.add(id);
    }
  }
}

function serializeKitchenExtras(
  raw: unknown,
  extraById: Map<string, { name: string }>,
  extraToType?: Map<string, string>,
): { id: string; name?: string; count: number; typeId?: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item !== 'object' || item === null) return { id: '', count: 1 };
    const o = item as Record<string, unknown>;
    const id = typeof o.id === 'string' ? o.id : typeof o._id === 'string' ? o._id : '';
    const count = typeof o.count === 'number' && Number.isFinite(o.count) ? Math.round(o.count) : 1;
    const name = id ? extraById.get(id)?.name : undefined;
    const typeId = id ? extraToType?.get(id) : undefined;
    return {
      id,
      ...(name ? { name } : {}),
      count,
      ...(typeId ? { typeId } : {}),
    };
  });
}

function serializeKitchenLine(
  line: OrderLine & { product: KitchenLineProduct },
  extraById: Map<string, { name: string }>,
  extraToType: Map<string, Map<string, string>>,
): Record<string, unknown> {
  const perLine = extraToType.get(line.id);
  const row: Record<string, unknown> = {
    id: line.product.id,
    name: line.product.name,
    count: line.quantity,
    extras: serializeKitchenExtras(line.extrasSnapshot, extraById, perLine),
  };
  if (line.compositionSnapshot != null) {
    row.compositionSnapshot = line.compositionSnapshot;
  }
  if (line.note) {
    row.note = line.note;
  }
  return row;
}

function attachKitchenShell(
  order: KitchenOrderRow,
  products: unknown[],
): Record<string, unknown> {
  const omitTable = order.orderType === 'takeaway' || order.tableId == null;
  const isChanged = order.cartRevision > order.kitchenSeenRevision;

  return {
    id: order.id,
    commandNumber: order.commandNumber,
    commandDate: order.commandDate,
    status: order.status,
    orderType: order.orderType,
    ...(omitTable
      ? {}
      : {
          tableId: order.tableId,
          ...(order.table != null ? { tableNumber: order.table.tableNumber } : {}),
        }),
    note: order.note ?? '',
    customerName: order.customerName ?? null,
    isChanged,
    cartRevision: order.cartRevision,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    products,
  };
}

export const kitchenOrderInclude = {
  lines: {
    include: {
      product: { select: orderLineProductSelect },
    },
  },
  table: { include: { zone: true } },
} as const;

/** Kitchen display / KDS — no prices, payment, or staff. */
export async function serializeOrdersKitchen(
  prisma: TenantDb,
  orders: KitchenOrderRow[],
): Promise<Record<string, unknown>[]> {
  const extraIds = new Set<string>();
  for (const o of orders) {
    collectExtraIds(o.lines, extraIds);
  }

  const extraRows =
    extraIds.size > 0
      ? await prisma.extra.findMany({
          where: { id: { in: [...extraIds] } },
          select: { id: true, name: true },
        })
      : [];

  const extraById = new Map(extraRows.map((e) => [e.id, e]));
  const composition = await loadMobileCompositionContext(prisma, orders as SerializableOrder[]);

  return orders.map((o) =>
    attachKitchenShell(
      o,
      o.lines.map((l) => serializeKitchenLine(l, extraById, composition.extraToType)),
    ),
  );
}

export async function serializeOrderKitchen(
  prisma: TenantDb,
  order: KitchenOrderRow,
): Promise<Record<string, unknown>> {
  const [one] = await serializeOrdersKitchen(prisma, [order]);
  return one!;
}
