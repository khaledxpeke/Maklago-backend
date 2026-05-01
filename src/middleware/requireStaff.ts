import type { NextFunction, Request, Response } from 'express';
import { verifyStaffToken } from '../auth/jwt';
import { sendError } from '../http/errorResponse';

export function requireStaff(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    sendError(res, 401, 'unauthorized', 'Missing or invalid Authorization header');
    return;
  }
  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    sendError(res, 401, 'unauthorized', 'Missing bearer token');
    return;
  }

  try {
    const payload = verifyStaffToken(token);
    if (!req.tenant) {
      sendError(res, 401, 'unauthorized', 'Tenant context missing — send x-tenant-id or use a staff token issued for this API');
      return;
    }
    if (payload.tenantId !== req.tenant.id) {
      sendError(res, 403, 'forbidden', 'Token is for a different tenant');
      return;
    }
    req.staff = { id: payload.sub, role: payload.role };
    next();
  } catch {
    sendError(res, 401, 'unauthorized', 'Invalid or expired token');
  }
}
