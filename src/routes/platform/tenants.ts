import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getRegistryClient } from '../../db/registry';
import { Prisma as TenantPrismaNs, StaffRole } from '../../db/tenant-client';
import { getTenantPrisma, removeTenantFromPool } from '../../db/tenantPool';
import { asyncHandler } from '../../http/asyncHandler';
import { sendError } from '../../http/errorResponse';
import { paramId } from '../../http/paramId';
import { platformAuth } from '../../middleware/platformAuth';
import { env } from '../../config/env';
import {
  isStaffLoginEmailTakenElsewhere,
  normalizeStaffLoginEmail,
  upsertStaffLoginDirectory,
} from '../../services/staffLoginDirectory';
import { Prisma as RegistryPrismaNs } from '../../db/registry-client';
import { generatePublicId } from '../../services/publicId';

const bodySchema = z
  .object({
    slug: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/),
    name: z.string().min(1).max(200),
    databaseUrl: z.string().min(1),
    ownerEmail: z.string().email().optional(),
    ownerPassword: z.string().min(8).optional(),
    ownerFirstName: z.string().min(1).max(100).optional(),
    ownerLastName: z.string().min(1).max(100).optional(),
    ownerPin: z.string().regex(/^\d{4}$/).optional(),
  })
  .refine(
    (d) => {
      const hasAny = !!(d.ownerEmail || d.ownerPassword || d.ownerFirstName || d.ownerLastName);
      if (!hasAny) return true;
      return !!(d.ownerEmail && d.ownerPassword && d.ownerFirstName && d.ownerLastName);
    },
    { message: 'ownerEmail, ownerPassword, ownerFirstName, and ownerLastName must be set together' },
  )
  .refine(
    (d) =>
      d.ownerPin === undefined ||
      !!(d.ownerEmail && d.ownerPassword && d.ownerFirstName && d.ownerLastName),
    {
      message: 'ownerPin requires ownerEmail, ownerPassword, ownerFirstName, and ownerLastName',
      path: ['ownerPin'],
    },
  );

export const platformTenantsRouter = Router();

const patchSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  isActive: z.boolean().optional(),
  databaseUrl: z.string().min(1).optional(),
});

const bootstrapOwnerSchema = z.object({
  ownerEmail: z.string().email(),
  ownerPassword: z.string().min(8),
  ownerFirstName: z.string().min(1).max(100),
  ownerLastName: z.string().min(1).max(100),
  ownerPin: z.string().regex(/^\d{4}$/).optional(),
});

const platformStaffPinBody = z.object({
  pin: z.string().regex(/^\d{4}$/, 'Must be exactly 4 digits'),
});

function tenantStaffPinSummary(s: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: Date;
  pinHash: string | null;
  pinMobileEnabled: boolean;
}) {
  const hasPin = Boolean(s.pinHash);
  return {
    id: s.id,
    email: s.email,
    firstName: s.firstName,
    lastName: s.lastName,
    role: s.role,
    isActive: s.isActive,
    createdAt: s.createdAt.toISOString(),
    hasPin,
    requiresMobilePin: hasPin && s.pinMobileEnabled,
  };
}

/** Placeholder id so `isStaffLoginEmailTakenElsewhere` treats any directory row as taken for create flows. */
const NEW_STAFF_SCOPE_ID = '00000000-0000-4000-8000-000000000000';

function summarizeTenantReachabilityError(e: unknown): string {
  if (e instanceof TenantPrismaNs.PrismaClientInitializationError) {
    const msg = e.message.replace(/\s+/g, ' ').trim();
    return msg.length > 450 ? `${msg.slice(0, 450)}…` : msg;
  }
  if (e instanceof Error) {
    const msg = e.message.replace(/\s+/g, ' ').trim();
    return msg.length > 450 ? `${msg.slice(0, 450)}…` : msg;
  }
  return 'Unknown error while connecting to the tenant database.';
}

platformTenantsRouter.get(
  '/',
  platformAuth,
  asyncHandler(async (_req, res) => {
    const registry = getRegistryClient();
    const rows = await registry.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json({ tenants: rows });
  }),
);

platformTenantsRouter.get(
  '/:id',
  platformAuth,
  asyncHandler(async (req, res) => {
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const row = await registry.tenant.findFirst({
      where: {
        OR: [{ id: key }, { slug: key }],
      },
    });
    if (!row) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    let activeOwnerCount: number | null = null;
    let activeOwnerCountError: string | null = null;
    try {
      const prisma = getTenantPrisma(row.id, row.databaseUrl);
      activeOwnerCount = await prisma.staff.count({
        where: { role: StaffRole.owner, isActive: true },
      });
    } catch (e) {
      activeOwnerCount = null;
      activeOwnerCountError = summarizeTenantReachabilityError(e);
      if (process.env.NODE_ENV === 'development') {
        console.warn('[platform] tenant owner count failed', { tenantId: row.id, slug: row.slug, err: e });
      }
    }

    res.json({
      tenant: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        databaseUrl: row.databaseUrl,
        isActive: row.isActive,
        activeOwnerCount,
        activeOwnerCountError,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    });
  }),
);

platformTenantsRouter.post(
  '/:id/bootstrap-owner',
  platformAuth,
  asyncHandler(async (req, res) => {
    const parsed = bootstrapOwnerSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const tenantRow = await registry.tenant.findFirst({
      where: { OR: [{ id: key }, { slug: key }] },
    });
    if (!tenantRow) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }

    const emailTrim = parsed.data.ownerEmail.trim().toLowerCase();
    const emailNorm = normalizeStaffLoginEmail(emailTrim);
    if (await isStaffLoginEmailTakenElsewhere(registry, emailNorm, tenantRow.id, NEW_STAFF_SCOPE_ID)) {
      sendError(res, 409, 'email_taken', 'This email is already registered for staff login');
      return;
    }

    const prisma = getTenantPrisma(tenantRow.id, tenantRow.databaseUrl);
    const activeOwners = await prisma.staff.count({
      where: { role: StaffRole.owner, isActive: true },
    });
    if (activeOwners > 0) {
      sendError(res, 409, 'tenant_already_has_owner', 'This restaurant already has an active owner');
      return;
    }

    const passwordHash = await bcrypt.hash(parsed.data.ownerPassword, env.bcryptRounds);
    const firstName = parsed.data.ownerFirstName.trim();
    const lastName = parsed.data.ownerLastName.trim();
    const pinHash = parsed.data.ownerPin
      ? await bcrypt.hash(parsed.data.ownerPin, env.bcryptRounds)
      : undefined;

    try {
      const createdStaff = await prisma.staff.create({
        data: {
          id: generatePublicId(),
          email: emailTrim,
          passwordHash,
          firstName,
          lastName,
          role: StaffRole.owner,
          ...(pinHash ? { pinHash, pinMobileEnabled: true } : {}),
        },
      });
      await upsertStaffLoginDirectory(registry, tenantRow.id, createdStaff.id, createdStaff.email);
      await registry.owner.create({
        data: {
          tenantId: tenantRow.id,
          email: emailTrim,
          passwordHash,
          firstName,
          lastName,
        },
      });
      res.status(201).json({
        staff: tenantStaffPinSummary(createdStaff),
      });
    } catch (e) {
      const dupTenant =
        e instanceof TenantPrismaNs.PrismaClientKnownRequestError && e.code === 'P2002';
      const dupRegistry =
        e instanceof RegistryPrismaNs.PrismaClientKnownRequestError && e.code === 'P2002';
      if (dupTenant || dupRegistry) {
        sendError(res, 409, 'duplicate', 'Owner email or login already exists for this restaurant');
        return;
      }
      throw e;
    }
  }),
);

platformTenantsRouter.get(
  '/:id/staff',
  platformAuth,
  asyncHandler(async (req, res) => {
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const tenantRow = await registry.tenant.findFirst({
      where: { OR: [{ id: key }, { slug: key }] },
    });
    if (!tenantRow) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    try {
      const prisma = getTenantPrisma(tenantRow.id, tenantRow.databaseUrl);
      const rows = await prisma.staff.findMany({ orderBy: { createdAt: 'asc' } });
      res.json({ staff: rows.map(tenantStaffPinSummary) });
    } catch (e) {
      sendError(res, 503, 'tenant_unreachable', summarizeTenantReachabilityError(e));
    }
  }),
);

platformTenantsRouter.put(
  '/:id/staff/:staffId/pin',
  platformAuth,
  asyncHandler(async (req, res) => {
    const parsed = platformStaffPinBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    const tenantKey = paramId(req);
    const staffId = paramId(req, 'staffId');
    if (!tenantKey || !staffId) {
      sendError(res, 400, 'validation_error', 'Missing tenant id or staff id');
      return;
    }
    const registry = getRegistryClient();
    const tenantRow = await registry.tenant.findFirst({
      where: { OR: [{ id: tenantKey }, { slug: tenantKey }] },
    });
    if (!tenantRow) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    try {
      const prisma = getTenantPrisma(tenantRow.id, tenantRow.databaseUrl);
      const existing = await prisma.staff.findUnique({ where: { id: staffId } });
      if (!existing) {
        sendError(res, 404, 'not_found', 'Staff not found');
        return;
      }
      if (existing.role !== StaffRole.owner) {
        sendError(res, 400, 'pin_owner_only', 'PIN can only be set on owner accounts');
        return;
      }
      const pinHash = await bcrypt.hash(parsed.data.pin, env.bcryptRounds);
      const row = await prisma.staff.update({
        where: { id: staffId },
        data: { pinHash, pinMobileEnabled: true },
      });
      res.json({ staff: tenantStaffPinSummary(row) });
    } catch (e) {
      sendError(res, 503, 'tenant_unreachable', summarizeTenantReachabilityError(e));
    }
  }),
);

platformTenantsRouter.delete(
  '/:id/staff/:staffId/pin',
  platformAuth,
  asyncHandler(async (req, res) => {
    const tenantKey = paramId(req);
    const staffId = paramId(req, 'staffId');
    if (!tenantKey || !staffId) {
      sendError(res, 400, 'validation_error', 'Missing tenant id or staff id');
      return;
    }
    const registry = getRegistryClient();
    const tenantRow = await registry.tenant.findFirst({
      where: { OR: [{ id: tenantKey }, { slug: tenantKey }] },
    });
    if (!tenantRow) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    try {
      const prisma = getTenantPrisma(tenantRow.id, tenantRow.databaseUrl);
      const existing = await prisma.staff.findUnique({ where: { id: staffId } });
      if (!existing) {
        sendError(res, 404, 'not_found', 'Staff not found');
        return;
      }
      if (existing.role !== StaffRole.owner) {
        sendError(res, 400, 'pin_owner_only', 'PIN only applies to owner accounts');
        return;
      }
      const row = await prisma.staff.update({
        where: { id: staffId },
        data: { pinHash: null, pinMobileEnabled: true },
      });
      res.json({ staff: tenantStaffPinSummary(row) });
    } catch (e) {
      sendError(res, 503, 'tenant_unreachable', summarizeTenantReachabilityError(e));
    }
  }),
);

platformTenantsRouter.patch(
  '/:id',
  platformAuth,
  asyncHandler(async (req, res) => {
    const parsed = patchSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const existing = await registry.tenant.findFirst({
      where: { OR: [{ id: key }, { slug: key }] },
    });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    const row = await registry.tenant.update({
      where: { id: existing.id },
      data: {
        ...('name' in parsed.data && parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
        ...('isActive' in parsed.data ? { isActive: parsed.data.isActive } : {}),
        ...('databaseUrl' in parsed.data && parsed.data.databaseUrl !== undefined
          ? { databaseUrl: parsed.data.databaseUrl }
          : {}),
      },
    });
    if ('isActive' in parsed.data && parsed.data.isActive === false) {
      removeTenantFromPool(existing.id);
    }
    res.json({
      tenant: {
        id: row.id,
        slug: row.slug,
        name: row.name,
        databaseUrl: row.databaseUrl,
        isActive: row.isActive,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    });
  }),
);

platformTenantsRouter.delete(
  '/:id',
  platformAuth,
  asyncHandler(async (req, res) => {
    const key = paramId(req);
    if (!key) {
      sendError(res, 400, 'validation_error', 'Missing tenant id');
      return;
    }
    const registry = getRegistryClient();
    const existing = await registry.tenant.findFirst({
      where: { OR: [{ id: key }, { slug: key }] },
    });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Tenant not found');
      return;
    }
    removeTenantFromPool(existing.id);
    await registry.tenant.delete({ where: { id: existing.id } });
    res.status(204).end();
  }),
);

platformTenantsRouter.post(
  '/',
  platformAuth,
  asyncHandler(async (req, res) => {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    const { slug, name, databaseUrl, ownerEmail, ownerPassword, ownerFirstName, ownerLastName, ownerPin } =
      parsed.data;

    const registry = getRegistryClient();
    const existing = await registry.tenant.findUnique({ where: { slug } });
    if (existing) {
      sendError(res, 409, 'slug_taken', 'Tenant slug already exists');
      return;
    }

    const hasOwner =
      !!(ownerEmail && ownerPassword && ownerFirstName && ownerLastName);
    const ownerPasswordHash = hasOwner
      ? await bcrypt.hash(ownerPassword!, env.bcryptRounds)
      : null;
    const ownerPinHash =
      hasOwner && ownerPin ? await bcrypt.hash(ownerPin, env.bcryptRounds) : undefined;

    const tenant = await registry.tenant.create({
      data: {
        slug,
        name,
        databaseUrl,
        ...(hasOwner && ownerPasswordHash
          ? {
              owners: {
                create: {
                  email: ownerEmail!.trim().toLowerCase(),
                  passwordHash: ownerPasswordHash,
                  firstName: ownerFirstName!,
                  lastName: ownerLastName!,
                },
              },
            }
          : {}),
      },
    });

    if (hasOwner && ownerPasswordHash) {
      try {
        const prisma = getTenantPrisma(tenant.id, databaseUrl);
        const createdStaff = await prisma.staff.create({
          data: {
            id: generatePublicId(),
            email: ownerEmail!.trim().toLowerCase(),
            passwordHash: ownerPasswordHash,
            firstName: ownerFirstName!,
            lastName: ownerLastName!,
            role: StaffRole.owner,
            ...(ownerPinHash ? { pinHash: ownerPinHash, pinMobileEnabled: true } : {}),
          },
        });
        await upsertStaffLoginDirectory(getRegistryClient(), tenant.id, createdStaff.id, createdStaff.email);
      } catch (e) {
        sendError(
          res,
          500,
          'staff_bootstrap_failed',
          'Tenant was registered, but creating the owner in the tenant database failed. Ensure tenant migrations were applied to that database URL, then add a staff user manually or fix the DB and retry.',
          e instanceof Error ? { message: e.message } : String(e),
        );
        return;
      }
    }

    res.status(201).json({
      tenant: {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
      },
    });
  }),
);
