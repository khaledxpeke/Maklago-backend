import type { NextFunction, Request, Response } from 'express';
import { verifyPlatformToken } from '../auth/platformJwt';
import { env } from '../config/env';
import { sendError } from '../http/errorResponse';

/**
 * Platform routes: `Authorization: Bearer <platform JWT>` from POST /platform/v1/auth/login,
 * or optional legacy `x-platform-key` when `PLATFORM_API_KEY` is set.
 */
export function platformAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length).trim();
    if (token) {
      try {
        const payload = verifyPlatformToken(token);
        req.platformAdmin = { id: payload.sub, email: payload.email };
        next();
        return;
      } catch {
        sendError(res, 401, 'unauthorized', 'Invalid or expired platform token');
        return;
      }
    }
  }

  const key = env.platformApiKey;
  if (key) {
    const provided = req.headers['x-platform-key'];
    const val = Array.isArray(provided) ? provided[0] : provided;
    if (val && val === key) {
      req.platformAdmin = { id: 'api-key', email: 'api-key' };
      next();
      return;
    }
  }

  sendError(
    res,
    401,
    'unauthorized',
    key
      ? 'Sign in at POST /platform/v1/auth/login or send x-platform-key'
      : 'Sign in at POST /platform/v1/auth/login',
  );
}
