import type { OrderStatus, OrderType, Prisma, PrismaClient } from '../db/tenant-client';
import { resolveStatsPeriodBounds, type StatsFilter } from './statistics';
import { tenantEntityIdSchema } from './publicId';

export type OrderListFilter = 'all' | 'today' | 'week' | 'month' | 'custom';

export type OrderListPagination = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
};

export type ParsedMobileOrderListQuery = {
  page: number;
  limit: number;
  skip: number;
  filter: OrderListFilter;
  startDate?: string;
  endDate?: string;
  status?: OrderStatus;
  tableId?: string;
  orderType?: OrderType;
  search?: string;
};

const orderStatuses = [
  'waiting',
  'confirmed',
  'preparing',
  'completed',
  'canceled',
] as const satisfies readonly OrderStatus[];

const orderTypes = ['dine_in', 'takeaway'] as const satisfies readonly OrderType[];

const listFilters = ['all', 'today', 'week', 'month', 'custom'] as const;

export function parseListPagination(query: Record<string, unknown>): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, Number(typeof query.page === 'string' ? query.page : undefined) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(typeof query.limit === 'string' ? query.limit : undefined) || 10),
  );
  return { page, limit, skip: (page - 1) * limit };
}

export function paginationMeta(
  currentPage: number,
  pageSize: number,
  totalRecords: number,
): OrderListPagination {
  const totalPages = totalRecords === 0 ? 0 : Math.ceil(totalRecords / pageSize);
  return { currentPage, pageSize, totalPages, totalRecords };
}

export function parseMobileOrderListQuery(
  query: Record<string, unknown>,
): { ok: true; value: ParsedMobileOrderListQuery } | { ok: false; message: string } {
  const { page, limit } = parseListPagination(query);

  const filterRaw = typeof query.filter === 'string' ? query.filter.trim() : 'all';
  const filter = (listFilters as readonly string[]).includes(filterRaw)
    ? (filterRaw as OrderListFilter)
    : 'all';

  const startDate = typeof query.startDate === 'string' ? query.startDate.trim() : undefined;
  const endDate = typeof query.endDate === 'string' ? query.endDate.trim() : undefined;

  const statusRaw = typeof query.status === 'string' ? query.status : undefined;
  const status =
    statusRaw && orderStatuses.includes(statusRaw as OrderStatus)
      ? (statusRaw as OrderStatus)
      : undefined;

  const orderTypeRaw = typeof query.orderType === 'string' ? query.orderType : undefined;
  const orderType =
    orderTypeRaw && orderTypes.includes(orderTypeRaw as OrderType)
      ? (orderTypeRaw as OrderType)
      : undefined;

  const tableIdRaw = typeof query.tableId === 'string' ? query.tableId : undefined;
  const tableIdParsed = tableIdRaw ? tenantEntityIdSchema.safeParse(tableIdRaw) : null;
  if (tableIdRaw && !tableIdParsed?.success) {
    return { ok: false, message: 'Invalid tableId' };
  }

  const searchRaw = typeof query.search === 'string' ? query.search.trim() : undefined;
  const search = searchRaw && searchRaw.length > 0 ? searchRaw : undefined;

  return {
    ok: true,
    value: {
      page,
      limit,
      skip: (page - 1) * limit,
      filter,
      startDate,
      endDate,
      status,
      tableId: tableIdParsed?.success ? tableIdParsed.data : undefined,
      orderType,
      search,
    },
  };
}

export async function buildMobileOrderListWhere(
  prisma: PrismaClient,
  q: ParsedMobileOrderListQuery,
): Promise<Prisma.OrderWhereInput> {
  const where: Prisma.OrderWhereInput = {};

  if (q.status) where.status = q.status;
  if (q.orderType) where.orderType = q.orderType;
  if (q.tableId) {
    where.tableId = q.tableId;
    where.orderType = 'dine_in';
  }

  if (q.filter !== 'all') {
    const hasCustomRange = Boolean(q.startDate || q.endDate);
    if (q.filter !== 'custom' || hasCustomRange) {
      const statsFilter: StatsFilter = q.filter === 'custom' ? 'custom' : q.filter;
      const { start, end } = await resolveStatsPeriodBounds(
        prisma,
        statsFilter,
        q.startDate,
        q.endDate,
      );
      where.createdAt = { gte: start, lte: end };
    }
  }

  if (q.search) {
    const commandNumber = Number.parseInt(q.search, 10);
    const or: Prisma.OrderWhereInput[] = [
      { reference: { contains: q.search, mode: 'insensitive' } },
      { customerName: { contains: q.search, mode: 'insensitive' } },
    ];
    if (Number.isFinite(commandNumber) && String(commandNumber) === q.search) {
      or.unshift({ commandNumber });
    }
    where.OR = or;
  }

  return where;
}
