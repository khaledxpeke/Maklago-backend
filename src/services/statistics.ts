import type { OrderStatus, PrismaClient } from '../db/tenant-client';
import { APP_TIMEZONE } from '../config/timezone';
import { centsToMajor } from '../http/money';

export type StatsFilter = 'today' | 'week' | 'month' | 'year' | 'custom';

export type StatsGroupBy = 'hour' | 'day' | 'week' | 'month' | 'year';

/** Orders that count toward revenue (excludes canceled). */
export const REVENUE_ORDER_STATUSES: OrderStatus[] = [
  'waiting',
  'confirmed',
  'preparing',
  'completed',
];

const STATS_TIMEZONE = APP_TIMEZONE;

export type StatsPeriod = {
  current: { start: Date; end: Date };
  previous: { start: Date; end: Date } | null;
  groupBy: StatsGroupBy;
  timeRangeLabel: string;
};

export type OrderStatusCounts = {
  waiting: number;
  confirmed: number;
  preparing: number;
  completed: number;
  canceled: number;
};

export type StatisticsResult = {
  totalRevenue: number;
  completedOrders: number;
  moyenRevenue: number;
  paymentMethodsTotalRevenue: {
    cash: number;
    card: number;
    cashCount: number;
    cardCount: number;
  };
  orderTypes: {
    dineInCount: number;
    takeawayCount: number;
    dineIn: number;
    takeaway: number;
  };
  totalOrders: number;
  totalPlat: number;
  orderStatuses: OrderStatusCounts;
  revenueComparison: {
    currentRevenue: number;
    previousRevenue: number;
    difference: number;
    percentageChange: number;
    currentRevenuePercentage: number;
    trend: 'increase' | 'decrease' | 'stable';
  };
  revenueOverTime: { date: string; totalRevenue: number }[];
  topProducts: {
    id: string;
    name: string;
    image: string | null;
    totalCount: number;
    totalRevenue: number;
  }[];
  filter: StatsFilter;
  timeRangeLabel: string;
};

function roundMajor(value: number): number {
  return Math.round(value * 100) / 100;
}

function centsToMajorRounded(cents: number): number {
  return roundMajor(centsToMajor(cents));
}

function emptyStatusCounts(): OrderStatusCounts {
  return {
    waiting: 0,
    confirmed: 0,
    preparing: 0,
    completed: 0,
    canceled: 0,
  };
}

function pickGroupBy(filter: StatsFilter, start?: Date, end?: Date): StatsGroupBy {
  if (filter === 'today') return 'hour';
  if (filter === 'week') return 'week';
  if (filter === 'month') return 'day';
  if (filter === 'year') return 'month';
  if (start && end) {
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays <= 1) return 'hour';
    if (diffDays <= 31) return 'day';
    if (diffDays <= 365) return 'month';
    return 'year';
  }
  return 'day';
}

function groupBySqlFormat(groupBy: StatsGroupBy): string {
  switch (groupBy) {
    case 'hour':
      return 'YYYY-MM-DD HH24:00';
    case 'day':
      return 'YYYY-MM-DD';
    case 'week':
      return 'IYYY-"W"IW';
    case 'month':
      return 'YYYY-MM';
    case 'year':
      return 'YYYY';
  }
}

function buildTimeRangeLabel(
  filter: StatsFilter,
  startDate?: string,
  endDate?: string,
): string {
  if (startDate?.trim() || endDate?.trim()) {
    if (startDate?.trim() && endDate?.trim()) return `${startDate} to ${endDate}`;
    if (startDate?.trim()) return `From ${startDate}`;
    if (endDate?.trim()) return `Until ${endDate}`;
  }
  return filter;
}

type PeriodRow = {
  current_start: Date;
  current_end: Date;
  previous_start: Date | null;
  previous_end: Date | null;
};

async function resolvePeriodWithSql(
  prisma: PrismaClient,
  filter: StatsFilter,
  startDate?: string,
  endDate?: string,
): Promise<PeriodRow> {
  const hasExplicitDates =
    Boolean(startDate?.trim()) || Boolean(endDate?.trim());

  if (hasExplicitDates) {
    const start = startDate?.trim() || endDate!.trim();
    const end = endDate?.trim() || startDate!.trim();
    const rows = await prisma.$queryRaw<PeriodRow[]>`
      SELECT
        (${start}::date AT TIME ZONE ${STATS_TIMEZONE}) AS current_start,
        (((${end}::date + interval '1 day') AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond') AS current_end,
        NULL::timestamptz AS previous_start,
        NULL::timestamptz AS previous_end
    `;
    return rows[0]!;
  }

  if (filter === 'today') {
    const rows = await prisma.$queryRaw<PeriodRow[]>`
      SELECT
        (date_trunc('day', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) AS current_start,
        (((date_trunc('day', timezone(${STATS_TIMEZONE}, now())) + interval '1 day') AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond') AS current_end,
        ((date_trunc('day', timezone(${STATS_TIMEZONE}, now()) - interval '1 day') AT TIME ZONE ${STATS_TIMEZONE})) AS previous_start,
        ((((date_trunc('day', timezone(${STATS_TIMEZONE}, now()))) AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond')) AS previous_end
    `;
    return rows[0]!;
  }

  if (filter === 'week') {
    const rows = await prisma.$queryRaw<PeriodRow[]>`
      SELECT
        (date_trunc('week', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) AS current_start,
        (((date_trunc('week', timezone(${STATS_TIMEZONE}, now())) + interval '1 week') AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond') AS current_end,
        ((date_trunc('week', timezone(${STATS_TIMEZONE}, now()) - interval '1 week') AT TIME ZONE ${STATS_TIMEZONE})) AS previous_start,
        (((date_trunc('week', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond')) AS previous_end
    `;
    return rows[0]!;
  }

  if (filter === 'month') {
    const rows = await prisma.$queryRaw<PeriodRow[]>`
      SELECT
        (date_trunc('month', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) AS current_start,
        (((date_trunc('month', timezone(${STATS_TIMEZONE}, now())) + interval '1 month') AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond') AS current_end,
        ((date_trunc('month', timezone(${STATS_TIMEZONE}, now()) - interval '1 month') AT TIME ZONE ${STATS_TIMEZONE})) AS previous_start,
        (((date_trunc('month', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond')) AS previous_end
    `;
    return rows[0]!;
  }

  if (filter === 'year') {
    const rows = await prisma.$queryRaw<PeriodRow[]>`
      SELECT
        (date_trunc('year', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) AS current_start,
        (((date_trunc('year', timezone(${STATS_TIMEZONE}, now())) + interval '1 year') AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond') AS current_end,
        ((date_trunc('year', timezone(${STATS_TIMEZONE}, now()) - interval '1 year') AT TIME ZONE ${STATS_TIMEZONE})) AS previous_start,
        (((date_trunc('year', timezone(${STATS_TIMEZONE}, now())) AT TIME ZONE ${STATS_TIMEZONE}) - interval '1 millisecond')) AS previous_end
    `;
    return rows[0]!;
  }

  // custom without dates — fall back to today
  return resolvePeriodWithSql(prisma, 'today');
}

/** Inclusive createdAt bounds for list filters (Tunisia / Africa/Tunis day boundaries). */
export async function resolveStatsPeriodBounds(
  prisma: PrismaClient,
  filter: StatsFilter,
  startDate?: string,
  endDate?: string,
): Promise<{ start: Date; end: Date }> {
  const row = await resolvePeriodWithSql(prisma, filter, startDate, endDate);
  return { start: row.current_start, end: row.current_end };
}

export async function getStatistics(
  prisma: PrismaClient,
  input: {
    filter?: StatsFilter;
    startDate?: string;
    endDate?: string;
  },
): Promise<StatisticsResult> {
  const filter = input.filter ?? 'today';
  const startDate = input.startDate?.trim();
  const endDate = input.endDate?.trim();
  const periodRow = await resolvePeriodWithSql(prisma, filter, startDate, endDate);

  const currentStart = periodRow.current_start;
  const currentEnd = periodRow.current_end;
  const previousStart = periodRow.previous_start;
  const previousEnd = periodRow.previous_end;

  const groupBy = pickGroupBy(filter, currentStart, currentEnd);
  const dateFormat = groupBySqlFormat(groupBy);
  const timeRangeLabel = buildTimeRangeLabel(filter, startDate, endDate);

  const dateWhere = { gte: currentStart, lte: currentEnd };
  const revenueWhere = {
    createdAt: dateWhere,
    status: { in: REVENUE_ORDER_STATUSES },
  };

  const [
    statusGroups,
    revenueAgg,
    cashAgg,
    cardAgg,
    dineInAgg,
    takeawayAgg,
    revenueOverTimeRows,
    topProductRows,
    totalPlatRow,
    previousRevenueAgg,
  ] = await Promise.all([
    prisma.order.groupBy({
      by: ['status'],
      where: { createdAt: dateWhere },
      _count: true,
    }),
    prisma.order.aggregate({
      where: revenueWhere,
      _sum: { totalCents: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { ...revenueWhere, paymentMethod: 'cash' },
      _sum: { totalCents: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { ...revenueWhere, paymentMethod: 'card' },
      _sum: { totalCents: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { ...revenueWhere, orderType: 'dine_in' },
      _sum: { totalCents: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { ...revenueWhere, orderType: 'takeaway' },
      _sum: { totalCents: true },
      _count: true,
    }),
    prisma.$queryRaw<{ date: string; total_cents: bigint }[]>`
      SELECT
        to_char(timezone(${STATS_TIMEZONE}, o.created_at), ${dateFormat}) AS date,
        COALESCE(SUM(o.total_cents), 0)::bigint AS total_cents
      FROM orders o
      WHERE o.created_at >= ${currentStart}
        AND o.created_at <= ${currentEnd}
        AND o.status <> 'canceled'
      GROUP BY 1
      ORDER BY 1 ASC
    `,
    prisma.$queryRaw<
      {
        id: string;
        name: string;
        image: string | null;
        total_count: bigint;
        total_revenue_cents: bigint;
      }[]
    >`
      SELECT
        p.id,
        p.name,
        p.image,
        COALESCE(SUM(ol.quantity), 0)::bigint AS total_count,
        COALESCE(SUM(ol.line_total_cents), 0)::bigint AS total_revenue_cents
      FROM order_lines ol
      INNER JOIN orders o ON o.id = ol.order_id
      INNER JOIN products p ON p.id = ol.product_id
      WHERE o.created_at >= ${currentStart}
        AND o.created_at <= ${currentEnd}
        AND o.status <> 'canceled'
      GROUP BY p.id, p.name, p.image
      ORDER BY total_count DESC
      LIMIT 7
    `,
    prisma.$queryRaw<{ total_plat: bigint | null }[]>`
      SELECT COALESCE(SUM(ol.quantity), 0)::bigint AS total_plat
      FROM order_lines ol
      INNER JOIN orders o ON o.id = ol.order_id
      WHERE o.status <> 'canceled'
    `,
    previousStart && previousEnd
      ? prisma.order.aggregate({
          where: {
            createdAt: { gte: previousStart, lte: previousEnd },
            status: { in: REVENUE_ORDER_STATUSES },
          },
          _sum: { totalCents: true },
        })
      : Promise.resolve({ _sum: { totalCents: 0 } }),
  ]);

  const orderStatuses = emptyStatusCounts();
  let totalOrders = 0;
  for (const row of statusGroups) {
    orderStatuses[row.status] = row._count;
    totalOrders += row._count;
  }

  const totalRevenueCents = revenueAgg._sum.totalCents ?? 0;
  const revenueOrderCount = revenueAgg._count;
  const totalRevenue = centsToMajorRounded(totalRevenueCents);
  const moyenRevenue =
    revenueOrderCount > 0 ? roundMajor(totalRevenue / revenueOrderCount) : 0;

  const currentRevenue = totalRevenue;
  const previousRevenue = centsToMajorRounded(previousRevenueAgg._sum.totalCents ?? 0);
  const revenueSum = currentRevenue + previousRevenue;
  const currentRevenuePercentage =
    revenueSum > 0 ? Math.floor((currentRevenue / revenueSum) * 100) : 0;

  let difference = currentRevenue - previousRevenue;
  if (difference < 0) difference = difference * -1;

  let percentageChange = 0;
  if (previousRevenue > 0) {
    percentageChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  } else if (currentRevenue > 0) {
    percentageChange = 100;
  }
  if (percentageChange < 0) percentageChange = percentageChange * -1;

  const trend: StatisticsResult['revenueComparison']['trend'] =
    currentRevenue > previousRevenue
      ? 'increase'
      : currentRevenue < previousRevenue
        ? 'decrease'
        : 'stable';

  return {
    totalRevenue,
    completedOrders: revenueOrderCount,
    moyenRevenue,
    paymentMethodsTotalRevenue: {
      cash: centsToMajorRounded(cashAgg._sum.totalCents ?? 0),
      card: centsToMajorRounded(cardAgg._sum.totalCents ?? 0),
      cashCount: cashAgg._count,
      cardCount: cardAgg._count,
    },
    orderTypes: {
      dineInCount: dineInAgg._count,
      takeawayCount: takeawayAgg._count,
      dineIn: centsToMajorRounded(dineInAgg._sum.totalCents ?? 0),
      takeaway: centsToMajorRounded(takeawayAgg._sum.totalCents ?? 0),
    },
    totalOrders,
    totalPlat: Number(totalPlatRow[0]?.total_plat ?? 0n),
    orderStatuses,
    revenueComparison: {
      currentRevenue,
      previousRevenue,
      difference: roundMajor(difference),
      percentageChange: roundMajor(percentageChange),
      currentRevenuePercentage,
      trend,
    },
    revenueOverTime: revenueOverTimeRows.map((row) => ({
      date: row.date,
      totalRevenue: centsToMajorRounded(Number(row.total_cents)),
    })),
    topProducts: topProductRows.map((row) => ({
      id: row.id,
      name: row.name,
      image: row.image,
      totalCount: Number(row.total_count),
      totalRevenue: centsToMajorRounded(Number(row.total_revenue_cents)),
    })),
    filter,
    timeRangeLabel,
  };
}
