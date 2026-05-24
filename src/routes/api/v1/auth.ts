import { Router } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signStaffToken } from '../../../auth/jwt';
import { env } from '../../../config/env';
import { getRegistryClient } from '../../../db/registry';
import { getTenantPrisma } from '../../../db/tenantPool';
import { asyncHandler } from '../../../http/asyncHandler';
import { sendError } from '../../../http/errorResponse';
import { requireStaff } from '../../../middleware/requireStaff';
import { normalizeStaffLoginEmail } from '../../../services/staffLoginDirectory';

const verifyPinSchema = z.object({
  pin: z.string().regex(/^\d{4}$/, 'Must be exactly 4 digits'),
});

const patchPinMobileSchema = z.object({
  pinMobileEnabled: z.boolean(),
  currentPin: z.string().regex(/^\d{4}$/).optional(),
});

/** PIN flags: `hasPin` = stored; `requiresMobilePin` = mobile should verify (respects per-user gate toggle). */
function staffAuthPinFields(staff: {
  pinHash: string | null;
  pinMobileEnabled: boolean;
}) {
  const hasPin = Boolean(staff.pinHash);
  return {
    hasPin,
    requiresMobilePin: hasPin && staff.pinMobileEnabled,
  };
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    const emailInput = parsed.data.email.trim();
    const emailNorm = normalizeStaffLoginEmail(emailInput);
    const { password } = parsed.data;

    let tenantId: string;
    let tenantSlug: string;
    let prisma = req.tenant?.prisma;
    let dirRow: { staffId: string; tenantId: string } | null = null;

    if (req.tenant && prisma) {
      tenantId = req.tenant.id;
      tenantSlug = req.tenant.slug;
    } else {
      if (!env.registryDatabaseUrl) {
        sendError(res, 503, 'registry_unconfigured', 'REGISTRY_DATABASE_URL is not set');
        return;
      }
      const registry = getRegistryClient();
      const dir = await registry.staffLoginDirectory.findUnique({
        where: { emailNormalized: emailNorm },
      });
      if (!dir) {
        sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
        return;
      }
      dirRow = { staffId: dir.staffId, tenantId: dir.tenantId };
      const tenantRow = await registry.tenant.findFirst({
        where: { id: dir.tenantId },
      });
      if (!tenantRow) {
        sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
        return;
      }
      if (!tenantRow.isActive) {
        sendError(res, 403, 'tenant_blocked', 'This restaurant has been disabled.');
        return;
      }
      prisma = getTenantPrisma(tenantRow.id, tenantRow.databaseUrl);
      tenantId = tenantRow.id;
      tenantSlug = tenantRow.slug;
    }

    const staff = await prisma.staff.findFirst({
      where: req.tenant
        ? { email: { equals: emailInput, mode: 'insensitive' } }
        : {
            id: dirRow!.staffId,
            email: { equals: emailInput, mode: 'insensitive' },
          },
    });

    if (!staff || !staff.isActive) {
      sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
      return;
    }

    if (dirRow && (staff.id !== dirRow.staffId || tenantId !== dirRow.tenantId)) {
      sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
      return;
    }

    const ok = await bcrypt.compare(password, staff.passwordHash);
    if (!ok) {
      sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
      return;
    }

    const token = signStaffToken({
      staffId: staff.id,
      tenantId,
      role: staff.role,
    });

    res.json({
      accessToken: token,
      expiresIn: env.jwtExpiresIn,
      tenantId,
      tenantSlug,
      staff: {
        id: staff.id,
        email: staff.email,
        firstName: staff.firstName,
        lastName: staff.lastName,
        role: staff.role,
        ...staffAuthPinFields(staff),
      },
    });
  }),
);

authRouter.get(
  '/me',
  requireStaff,
  asyncHandler(async (req, res) => {
    if (!req.tenant || !req.staff) {
      sendError(res, 500, 'internal_error', 'Context missing');
      return;
    }
    const staff = await req.tenant.prisma.staff.findUnique({ where: { id: req.staff.id } });
    if (!staff) {
      sendError(res, 404, 'not_found', 'Staff not found');
      return;
    }
    res.json({
      tenantId: req.tenant.id,
      slug: req.tenant.slug,
      staff: {
        id: staff.id,
        email: staff.email,
        firstName: staff.firstName,
        lastName: staff.lastName,
        role: staff.role,
        ...staffAuthPinFields(staff),
      },
    });
  }),
);

authRouter.patch(
  '/me/pin-mobile-enabled',
  requireStaff,
  asyncHandler(async (req, res) => {
    const parsed = patchPinMobileSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) {
      sendError(res, 500, 'internal_error', 'Context missing');
      return;
    }
    const staff = await req.tenant.prisma.staff.findUnique({ where: { id: req.staff.id } });
    if (!staff) {
      sendError(res, 404, 'not_found', 'Staff not found');
      return;
    }
    const next = parsed.data.pinMobileEnabled;
    if (next && !staff.pinHash) {
      sendError(
        res,
        400,
        'pin_required',
        'A PIN must be configured by the owner before enabling the mobile PIN gate.',
      );
      return;
    }
    if (!next && staff.pinHash) {
      if (!parsed.data.currentPin) {
        sendError(
          res,
          400,
          'current_pin_required',
          'Send currentPin (4 digits) to disable the mobile PIN gate while a PIN is set.',
        );
        return;
      }
      const ok = await bcrypt.compare(parsed.data.currentPin, staff.pinHash);
      if (!ok) {
        sendError(res, 401, 'invalid_pin', 'Invalid PIN');
        return;
      }
    }
    const row = await req.tenant.prisma.staff.update({
      where: { id: staff.id },
      data: { pinMobileEnabled: next },
    });
    res.json({
      staff: {
        id: row.id,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
        role: row.role,
        ...staffAuthPinFields(row),
      },
    });
  }),
);

authRouter.post(
  '/verify-pin',
  requireStaff,
  asyncHandler(async (req, res) => {
    const parsed = verifyPinSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) {
      sendError(res, 500, 'internal_error', 'Context missing');
      return;
    }
    const staff = await req.tenant.prisma.staff.findUnique({ where: { id: req.staff.id } });
    if (!staff) {
      sendError(res, 404, 'not_found', 'Staff not found');
      return;
    }
    if (!staff.pinHash) {
      sendError(res, 400, 'pin_not_set', 'No PIN is configured for this account');
      return;
    }
    const ok = await bcrypt.compare(parsed.data.pin, staff.pinHash);
    if (!ok) {
      sendError(res, 401, 'invalid_pin', 'Invalid PIN');
      return;
    }
    res.json({ verified: true });
  }),
);
