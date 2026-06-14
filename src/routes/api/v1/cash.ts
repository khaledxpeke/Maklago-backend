import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../../../http/asyncHandler';
import { sendError } from '../../../http/errorResponse';
import { requireRole } from '../../../middleware/requireRole';
import { requireStaff } from '../../../middleware/requireStaff';
import { denyChef } from '../../../middleware/requireRole';
import { getCashShiftDetailed, getCashShiftSummary } from '../../../services/cashShift';
import { buildShiftCloseReceipt } from '../../../services/printJob';

const managerOnly = requireRole('manager', 'owner');

const shiftQuerySchema = z.object({
  filter: z.enum(['today', 'week', 'month', 'custom']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

function parseShiftQuery(req: { query: Record<string, unknown> }) {
  return shiftQuerySchema.safeParse(req.query);
}

export const cashRouter = Router();
cashRouter.use(requireStaff);
cashRouter.use(denyChef);
cashRouter.use(managerOnly);

/** Summary lines: ticket #, reference, total — for close-shift preview. */
cashRouter.get(
  '/shift/summary',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const parsed = parseShiftQuery(req);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid query', parsed.error.flatten());
      return;
    }
    const report = await getCashShiftSummary(req.tenant.prisma, parsed.data);
    res.json(report);
  }),
);

/** Full order detail (products, extras, totals) for the shift period. */
cashRouter.get(
  '/shift/detailed',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const parsed = parseShiftQuery(req);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid query', parsed.error.flatten());
      return;
    }
    const report = await getCashShiftDetailed(req, req.tenant.prisma, parsed.data);
    res.json(report);
  }),
);

const closeBodySchema = z.object({
  filter: z.enum(['today', 'week', 'month', 'custom']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  note: z.string().max(2000).optional(),
});

/** Close shift: returns summary + print payload stub (drawer/print disabled until hardware wired). */
cashRouter.post(
  '/shift/close',
  asyncHandler(async (req, res) => {
    if (!req.tenant || !req.staff) return;
    const parsed = closeBodySchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    const report = await getCashShiftSummary(req.tenant.prisma, parsed.data);
    const closedAt = new Date();

    const venueName = req.tenant.slug;

    const printJob = buildShiftCloseReceipt({
      venueName,
      closedAt,
      periodLabel: report.period.filter,
      lines: report.orders
        .filter((o) => o.status === 'completed')
        .map((o) => ({
          commandNumber: o.commandNumber,
          reference: o.reference,
          total: o.total,
        })),
      totals: {
        grandTotal: report.totals.grandTotal,
        cashTotal: report.totals.cashTotal,
        cardTotal: report.totals.cardTotal,
        orderCount: report.totals.completedCount,
      },
    });

    res.json({
      closedAt: closedAt.toISOString(),
      closedBy: req.staff.id,
      note: parsed.data.note ?? null,
      ...report,
      hardware: {
        print: null,
        openDrawer: false,
        message: 'Printer and cash drawer not configured — receipt payload included for future use.',
      },
      printJob,
    });
  }),
);
