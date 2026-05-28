import type { Order, OrderStatus, PrismaClient } from '../db/tenant-client';
import type { Request } from 'express';
import { centsToMajor } from '../http/money';
import {
  orderEnrichedInclude,
  serializeOrdersEnriched,
  type SerializableOrderEnriched,
} from './orderJson';
import { resolveStatsPeriodBounds, type StatsFilter } from './statistics';

export type CashShiftFilter = 'today' | 'week' | 'month' | 'custom';

export type CashShiftPeriod = {
  filter: CashShiftFilter;
  start: string;
  end: string;
};

export type CashShiftSummaryLine = {
  id: string;
  commandNumber: number;
  reference: string;
  status: OrderStatus;
  paymentMethod: string;
  orderType: string;
  total: number;
  createdAt: string;
};

export type CashShiftTotals = {
  orderCount: number;
  completedCount: number;
  cashTotal: number;
  cardTotal: number;
  unpaidTotal: number;
  subtotal: number;
  tva: number;
  grandTotal: number;
};

export type CashShiftSummaryReport = {
  period: CashShiftPeriod;
  orders: CashShiftSummaryLine[];
  totals: CashShiftTotals;
};

export type CashShiftDetailedReport = CashShiftSummaryReport & {
  ordersDetailed: Record<string, unknown>[];
};

const REVENUE_STATUSES: OrderStatus[] = ['confirmed', 'preparing', 'completed'];

function parseShiftFilter(filterRaw: string | undefined): CashShiftFilter {
  if (filterRaw === 'week' || filterRaw === 'month' || filterRaw === 'custom') return filterRaw;
  return 'today';
}

export async function resolveCashShiftPeriod(
  prisma: PrismaClient,
  filter: CashShiftFilter,
  startDate?: string,
  endDate?: string,
): Promise<{ start: Date; end: Date }> {
  const statsFilter: StatsFilter = filter === 'custom' ? 'custom' : filter;
  return resolveStatsPeriodBounds(prisma, statsFilter, startDate, endDate);
}

async function loadShiftOrders(
  prisma: PrismaClient,
  period: { start: Date; end: Date },
): Promise<SerializableOrderEnriched[]> {
  return prisma.order.findMany({
    where: {
      createdAt: { gte: period.start, lte: period.end },
      status: { in: REVENUE_STATUSES },
    },
    orderBy: [{ commandNumber: 'desc' }, { createdAt: 'desc' }],
    include: orderEnrichedInclude,
  });
}

export function computeShiftTotals(orders: Pick<Order, 'status' | 'paymentMethod' | 'totalCents' | 'subtotalCents' | 'taxCents'>[]): CashShiftTotals {
  const completed = orders.filter((o) => o.status === 'completed');
  let cashTotal = 0;
  let cardTotal = 0;
  let unpaidTotal = 0;
  let subtotal = 0;
  let tva = 0;
  let grandTotal = 0;

  for (const o of completed) {
    grandTotal += o.totalCents;
    subtotal += o.subtotalCents;
    tva += o.taxCents;
    if (o.paymentMethod === 'cash') cashTotal += o.totalCents;
    else if (o.paymentMethod === 'card') cardTotal += o.totalCents;
    else unpaidTotal += o.totalCents;
  }

  return {
    orderCount: orders.length,
    completedCount: completed.length,
    cashTotal: centsToMajor(cashTotal),
    cardTotal: centsToMajor(cardTotal),
    unpaidTotal: centsToMajor(unpaidTotal),
    subtotal: centsToMajor(subtotal),
    tva: centsToMajor(tva),
    grandTotal: centsToMajor(grandTotal),
  };
}

function toSummaryLines(orders: SerializableOrderEnriched[]): CashShiftSummaryLine[] {
  return orders.map((o) => ({
    id: o.id,
    commandNumber: o.commandNumber,
    reference: o.reference,
    status: o.status,
    paymentMethod: o.paymentMethod,
    orderType: o.orderType,
    total: centsToMajor(o.totalCents),
    createdAt: o.createdAt.toISOString(),
  }));
}

export async function getCashShiftSummary(
  prisma: PrismaClient,
  input: { filter?: string; startDate?: string; endDate?: string },
): Promise<CashShiftSummaryReport> {
  const filter = parseShiftFilter(input.filter);
  const period = await resolveCashShiftPeriod(prisma, filter, input.startDate, input.endDate);
  const orders = await loadShiftOrders(prisma, period);

  return {
    period: {
      filter,
      start: period.start.toISOString(),
      end: period.end.toISOString(),
    },
    orders: toSummaryLines(orders),
    totals: computeShiftTotals(orders),
  };
}

export async function getCashShiftDetailed(
  req: Request,
  prisma: PrismaClient,
  input: { filter?: string; startDate?: string; endDate?: string },
): Promise<CashShiftDetailedReport> {
  const summary = await getCashShiftSummary(prisma, input);
  const filter = parseShiftFilter(input.filter);
  const period = await resolveCashShiftPeriod(prisma, filter, input.startDate, input.endDate);
  const orders = await loadShiftOrders(prisma, period);
  const ordersDetailed = await serializeOrdersEnriched(req, prisma, orders);

  return {
    ...summary,
    ordersDetailed,
  };
}
