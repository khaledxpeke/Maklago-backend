import { Router } from 'express';
import { asyncHandler } from '../../../http/asyncHandler';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';

export const statsRouter = Router();
statsRouter.use(requireStaff);

statsRouter.get(
  '/summary',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const prisma = req.tenant.prisma;

    const fromRaw = typeof req.query.from === 'string' ? req.query.from : undefined;
    const toRaw = typeof req.query.to === 'string' ? req.query.to : undefined;
    const from = fromRaw ? new Date(fromRaw) : undefined;
    const to = toRaw ? new Date(toRaw) : undefined;
    if (from && Number.isNaN(from.getTime())) {
      sendError(res, 400, 'validation_error', 'Invalid `from` date (use ISO 8601)');
      return;
    }
    if (to && Number.isNaN(to.getTime())) {
      sendError(res, 400, 'validation_error', 'Invalid `to` date (use ISO 8601)');
      return;
    }

    const dateFilter =
      from || to
        ? {
            createdAt: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {};

    const [allAgg, completedAgg, activeCount] = await Promise.all([
      prisma.order.aggregate({
        where: dateFilter,
        _sum: { totalCents: true, subtotalCents: true, taxCents: true },
        _count: true,
      }),
      prisma.order.aggregate({
        where: { status: 'completed', ...dateFilter },
        _sum: { totalCents: true },
        _count: true,
      }),
      prisma.order.count({
        where: {
          status: { in: ['waiting', 'confirmed', 'preparing'] },
          ...dateFilter,
        },
      }),
    ]);

    res.json({
      summary: {
        ordersTotal: allAgg._count,
        completedOrders: completedAgg._count,
        activeOrDraftOrders: activeCount,
        revenueCentsCompleted: completedAgg._sum.totalCents ?? 0,
        allTimeTotals: {
          subtotalCents: allAgg._sum.subtotalCents ?? 0,
          taxCents: allAgg._sum.taxCents ?? 0,
          totalCents: allAgg._sum.totalCents ?? 0,
        },
      },
    });
  }),
);
