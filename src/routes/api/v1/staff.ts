import { Router } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import type { StaffRole } from '../../../db/tenant-client';
import { env } from '../../../config/env';
import { getRegistryClient } from '../../../db/registry';
import { asyncHandler } from '../../../http/asyncHandler';
import { paramId } from '../../../http/paramId';
import { sendError } from '../../../http/errorResponse';
import { requireRole } from '../../../middleware/requireRole';
import { requireStaff } from '../../../middleware/requireStaff';
import {
  isStaffLoginEmailTakenElsewhere,
  normalizeStaffLoginEmail,
  removeStaffLoginDirectory,
  upsertStaffLoginDirectory,
} from '../../../services/staffLoginDirectory';
import { generatePublicId } from '../../../services/publicId';

const admin = requireRole('owner', 'manager');

const roleEnum = z.enum(['owner', 'manager', 'cashier']);

function canSetRole(actor: StaffRole, targetRole: StaffRole): boolean {
  if (actor === 'owner') return true;
  if (actor === 'manager') return targetRole === 'manager' || targetRole === 'cashier';
  return false;
}

const createBody = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: roleEnum,
});

const patchBody = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).max(200).optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: roleEnum.optional(),
  isActive: z.boolean().optional(),
});

export const staffRouter = Router();
staffRouter.use(requireStaff);

staffRouter.use(admin);

function staffPublic(s: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: Date;
  pinHash?: string | null;
  pinMobileEnabled?: boolean;
}) {
  const owner = s.role === 'owner';
  const hasPin = Boolean(s.pinHash);
  const gateOn = owner ? Boolean(s.pinMobileEnabled ?? true) : false;
  const requiresMobilePin = owner && hasPin && gateOn;
  return {
    id: s.id,
    email: s.email,
    firstName: s.firstName,
    lastName: s.lastName,
    role: s.role,
    isActive: s.isActive,
    createdAt: s.createdAt.toISOString(),
    hasPin,
    requiresMobilePin,
  };
}

staffRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.tenant || !req.staff) return;
    const rows = await req.tenant.prisma.staff.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json({ staff: rows.map(staffPublic) });
  }),
);

staffRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.tenant) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing staff id');
      return;
    }
    const row = await req.tenant.prisma.staff.findUnique({ where: { id } });
    if (!row) {
      sendError(res, 404, 'not_found', 'Staff not found');
      return;
    }
    res.json({ staff: staffPublic(row) });
  }),
);

staffRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = createBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) return;

    if (!canSetRole(req.staff.role, parsed.data.role)) {
      sendError(res, 403, 'forbidden', 'Cannot assign this role');
      return;
    }

    const emailNorm = normalizeStaffLoginEmail(parsed.data.email);
    const registry = getRegistryClient();
    if (await isStaffLoginEmailTakenElsewhere(registry, emailNorm, req.tenant.id, '')) {
      sendError(
        res,
        409,
        'email_taken',
        'This email is already registered for another restaurant. Staff emails must be unique across all tenants for password login.',
      );
      return;
    }

    const hash = await bcrypt.hash(parsed.data.password, env.bcryptRounds);
    try {
      const row = await req.tenant.prisma.staff.create({
        data: {
          id: generatePublicId(),
          email: emailNorm,
          passwordHash: hash,
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          role: parsed.data.role,
        },
      });
      await upsertStaffLoginDirectory(registry, req.tenant.id, row.id, row.email);
      res.status(201).json({ staff: staffPublic(row) });
    } catch {
      sendError(res, 409, 'email_taken', 'Email already in use');
    }
  }),
);

staffRouter.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = patchBody.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }
    if (!req.tenant || !req.staff) return;
    const id = paramId(req);
    if (!id) {
      sendError(res, 400, 'validation_error', 'Missing staff id');
      return;
    }

    const existing = await req.tenant.prisma.staff.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'not_found', 'Staff not found');
      return;
    }

    if (existing.role === 'owner' && req.staff.role !== 'owner') {
      sendError(res, 403, 'forbidden', 'Only an owner can change owner accounts');
      return;
    }

    if (parsed.data.role !== undefined && !canSetRole(req.staff.role, parsed.data.role)) {
      sendError(res, 403, 'forbidden', 'Cannot assign this role');
      return;
    }

    if (existing.role === 'owner') {
      const newRole = parsed.data.role ?? existing.role;
      const newActive = parsed.data.isActive ?? existing.isActive;
      const removesOwner =
        newRole !== 'owner' || newActive === false;
      if (removesOwner) {
        const otherActiveOwners = await req.tenant.prisma.staff.count({
          where: { role: 'owner', isActive: true, id: { not: id } },
        });
        if (otherActiveOwners === 0) {
          sendError(res, 400, 'last_owner', 'Cannot remove or demote the last active owner');
          return;
        }
      }
    }

    const data: {
      email?: string;
      firstName?: string;
      lastName?: string;
      role?: StaffRole;
      isActive?: boolean;
      passwordHash?: string;
      pinHash?: string | null;
      pinMobileEnabled?: boolean;
    } = {};
    if (parsed.data.email !== undefined) data.email = parsed.data.email.trim().toLowerCase();
    if (parsed.data.firstName !== undefined) data.firstName = parsed.data.firstName;
    if (parsed.data.lastName !== undefined) data.lastName = parsed.data.lastName;
    if (parsed.data.role !== undefined) data.role = parsed.data.role;
    if (parsed.data.isActive !== undefined) data.isActive = parsed.data.isActive;
    if (parsed.data.password !== undefined) {
      data.passwordHash = await bcrypt.hash(parsed.data.password, env.bcryptRounds);
    }
    if (parsed.data.role !== undefined && parsed.data.role !== 'owner') {
      data.pinHash = null;
      data.pinMobileEnabled = true;
    }

    if (parsed.data.email !== undefined) {
      const norm = normalizeStaffLoginEmail(parsed.data.email);
      const registry = getRegistryClient();
      if (await isStaffLoginEmailTakenElsewhere(registry, norm, req.tenant.id, id)) {
        sendError(
          res,
          409,
          'email_taken',
          'This email is already registered for another restaurant.',
        );
        return;
      }
    }

    if (Object.keys(data).length === 0) {
      res.json({ staff: staffPublic(existing) });
      return;
    }

    try {
      const registry = getRegistryClient();
      const row = await req.tenant.prisma.staff.update({
        where: { id },
        data,
      });
      if (!row.isActive) {
        await removeStaffLoginDirectory(registry, req.tenant.id, row.id);
      } else {
        await upsertStaffLoginDirectory(registry, req.tenant.id, row.id, row.email);
      }
      res.json({ staff: staffPublic(row) });
    } catch {
      sendError(res, 409, 'email_taken', 'Email already in use');
    }
  }),
);
