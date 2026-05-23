import type {
  ActivityAction,
  ActivityEntityType,
  Prisma,
  PrismaClient,
} from '../db/tenant-client';
import { centsToMajor } from '../http/money';
import { generatePublicId } from './publicId';

type Db = PrismaClient | Prisma.TransactionClient;

export type RecordActivityInput = {
  staffId: string;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: string;
  summary?: string;
  metadata?: Record<string, unknown>;
};

export async function recordActivityLog(db: Db, input: RecordActivityInput): Promise<void> {
  await db.activityLog.create({
    data: {
      id: generatePublicId(),
      staffId: input.staffId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      summary: input.summary ?? null,
      metadata: (input.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
    },
  });
}

const staffSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
} as const;

export type ActivityLogRow = {
  id: string;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: string;
  summary: string | null;
  metadata: unknown;
  createdAt: Date;
  staff: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
};

export function activityLogToJson(row: ActivityLogRow): Record<string, unknown> {
  return {
    id: row.id,
    action: row.action,
    entityType: row.entityType,
    entityId: row.entityId,
    summary: row.summary,
    metadata: row.metadata,
    createdAt: row.createdAt.toISOString(),
    staff: {
      id: row.staff.id,
      firstName: row.staff.firstName,
      lastName: row.staff.lastName,
      email: row.staff.email,
      role: row.staff.role,
    },
  };
}

export async function listActivityLogs(
  db: PrismaClient,
  filters: {
    entityType?: ActivityEntityType;
    entityId?: string;
    action?: ActivityAction;
    take: number;
  },
): Promise<ActivityLogRow[]> {
  return db.activityLog.findMany({
    where: {
      ...(filters.entityType ? { entityType: filters.entityType } : {}),
      ...(filters.entityId ? { entityId: filters.entityId } : {}),
      ...(filters.action ? { action: filters.action } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: filters.take,
    include: { staff: { select: staffSelect } },
  });
}

export async function logOrderCreated(
  db: Db,
  staffId: string,
  order: {
    id: string;
    reference: string;
    commandNumber: number;
    orderType: string;
    tableId: string | null;
    status: string;
    totalCents: number;
    lineCount: number;
  },
): Promise<void> {
  await recordActivityLog(db, {
    staffId,
    action: 'order_created',
    entityType: 'order',
    entityId: order.id,
    summary: `Order #${order.commandNumber} created`,
    metadata: {
      reference: order.reference,
      commandNumber: order.commandNumber,
      orderType: order.orderType,
      tableId: order.tableId,
      status: order.status,
      total: centsToMajor(order.totalCents),
      lineCount: order.lineCount,
    },
  });
}

export async function logOrderCartUpdated(
  db: Db,
  staffId: string,
  orderId: string,
  meta: {
    lineCount: number;
    totalCents: number;
    paymentReset: boolean;
  },
): Promise<void> {
  await recordActivityLog(db, {
    staffId,
    action: 'order_updated',
    entityType: 'order',
    entityId: orderId,
    summary: `Cart updated (${meta.lineCount} item${meta.lineCount === 1 ? '' : 's'})`,
    metadata: {
      lineCount: meta.lineCount,
      total: centsToMajor(meta.totalCents),
      paymentReset: meta.paymentReset,
    },
  });
}

export async function logOrderStatusChanged(
  db: Db,
  staffId: string,
  orderId: string,
  from: string,
  to: string,
): Promise<void> {
  await recordActivityLog(db, {
    staffId,
    action: 'order_status_changed',
    entityType: 'order',
    entityId: orderId,
    summary: `Status ${from} → ${to}`,
    metadata: { from, to },
  });
}

export async function logOrderPaymentRecorded(
  db: Db,
  staffId: string,
  orderId: string,
  paymentMethod: string,
  previousPaymentMethod: string,
): Promise<void> {
  await recordActivityLog(db, {
    staffId,
    action: 'order_payment_recorded',
    entityType: 'order',
    entityId: orderId,
    summary: `Paid ${paymentMethod}`,
    metadata: {
      paymentMethod,
      previousPaymentMethod,
    },
  });
}

export async function logOrderTableChanged(
  db: Db,
  staffId: string,
  orderId: string,
  fromTableId: string | null,
  toTableId: string,
): Promise<void> {
  await recordActivityLog(db, {
    staffId,
    action: 'order_table_changed',
    entityType: 'order',
    entityId: orderId,
    summary: 'Table changed',
    metadata: {
      fromTableId,
      toTableId,
    },
  });
}
