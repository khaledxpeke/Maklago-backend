import { Router } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signPlatformToken } from '../../auth/platformJwt';
import { env } from '../../config/env';
import { getRegistryClient } from '../../db/registry';
import { asyncHandler } from '../../http/asyncHandler';
import { sendError } from '../../http/errorResponse';
import { platformAuth } from '../../middleware/platformAuth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const platformAuthRouter = Router();

platformAuthRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'validation_error', 'Invalid body', parsed.error.flatten());
      return;
    }

    const registry = getRegistryClient();
    const admin = await registry.platformAdmin.findUnique({
      where: { email: parsed.data.email },
    });
    if (!admin) {
      sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
      return;
    }

    const ok = await bcrypt.compare(parsed.data.password, admin.passwordHash);
    if (!ok) {
      sendError(res, 401, 'invalid_credentials', 'Invalid email or password');
      return;
    }

    const accessToken = signPlatformToken({ adminId: admin.id, email: admin.email });

    res.json({
      accessToken,
      expiresIn: env.jwtExpiresIn,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
      },
    });
  }),
);

platformAuthRouter.get(
  '/me',
  platformAuth,
  asyncHandler(async (req, res) => {
    if (!req.platformAdmin || req.platformAdmin.id === 'api-key') {
      res.json({ admin: { mode: 'api-key' } });
      return;
    }
    const registry = getRegistryClient();
    const admin = await registry.platformAdmin.findUnique({
      where: { id: req.platformAdmin.id },
    });
    if (!admin) {
      sendError(res, 401, 'unauthorized', 'Platform admin not found');
      return;
    }
    res.json({
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
      },
    });
  }),
);
