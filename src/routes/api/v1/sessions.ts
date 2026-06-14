import { Router } from 'express';
import { z } from 'zod';
import type { CashierSession, Staff } from '../../../db/tenant-client';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { denyChef } from '../../../middleware/requireRole';
import { generatePublicId } from '../../../services/publicId';

export const sessionsRouter = Router();
sessionsRouter.use(requireStaff);
sessionsRouter.use(denyChef);

type SessionWithStaff = CashierSession & {
  staff?: Pick<Staff, 'id' | 'firstName' | 'lastName' | 'email'> | null;
};

function sessionJson(s: SessionWithStaff): Record<string, unknown> {
  const { id, staff, ...rest } = s;
  const base: Record<string, unknown> = { id, ...rest };
  if (staff != null) {
    base.staff = {
      id: staff.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
    };
  }
  return base;
}

sessionsRouter.get(
  '/active',
  asyncHandler(async (req, res) => {
    if (!req.tenant || !req.staff) return;
    const open = await req.tenant.prisma.cashierSession.findFirst({
      where: { staffId: req.staff.id, closedAt: null },
      orderBy: { openedAt: 'desc' },
    });
    res.json({ session: open ? sessionJson(open) : null });
  }),
);

sessionsRouter.post(
  '/open',
  asyncHandler(async (req, res) => {
    const schema = z.object({
      openingFloatCents: z.number().int().min(0).default(0),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) return;

    const existing = await req.tenant.prisma.cashierSession.findFirst({
      where: { staffId: req.staff.id, closedAt: null },
    });
    if (existing) {
      sendError(res, 409, 'session_open', 'Close the current session before opening a new one', {
        id: existing.id,
      });
      return;
    }

    const session = await req.tenant.prisma.cashierSession.create({
      data: {
        id: generatePublicId(),
        staffId: req.staff.id,
        openingFloatCents: parsed.data.openingFloatCents,
      },
    });
    res.status(201).json({ session: sessionJson(session) });
  }),
);

sessionsRouter.post(
  '/:id/close',
  asyncHandler(async (req, res) => {
    const schema = z.object({
      closingNote: z.string().max(2000).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) return;

    const sid = paramId(req);
    if (!sid) {
      sendError(res, 400, 'validation_error', 'Missing session id');
      return;
    }
    const session = await req.tenant.prisma.cashierSession.findFirst({
      where: { id: sid, staffId: req.staff.id, closedAt: null },
    });
    if (!session) {
      sendError(res, 404, 'not_found', 'Open session not found');
      return;
    }

    const closedAt = new Date();
    const orders = await req.tenant.prisma.order.findMany({
      where: {
        staffId: session.staffId,
        createdAt: { gte: session.openedAt, lte: closedAt },
      },
      select: {
        id: true,
        totalCents: true,
        status: true,
      },
    });

    const closed = await req.tenant.prisma.cashierSession.update({
      where: { id: session.id },
      data: {
        closedAt,
        closingNote: parsed.data.closingNote ?? null,
      },
    });

    const summary = {
      id: closed.id,
      openedAt: closed.openedAt,
      closedAt: closed.closedAt,
      openingFloatCents: closed.openingFloatCents,
      orderCount: orders.length,
      completedTotalCents: orders
        .filter((o) => o.status === 'completed')
        .reduce((s, o) => s + o.totalCents, 0),
      orders: orders.map((o) => ({
        id: o.id,
        totalCents: o.totalCents,
        status: o.status,
      })),
    };

    res.json({ session: sessionJson(closed), summary });
  }),
);

sessionsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const take = Math.min(100, Math.max(1, Number(req.query.limit ?? 30)));
    const rows = await req.tenant.prisma.cashierSession.findMany({
      orderBy: { openedAt: 'desc' },
      take,
      include: {
        staff: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });
    res.json({ sessions: rows.map((r) => sessionJson(r)) });
  }),
);
