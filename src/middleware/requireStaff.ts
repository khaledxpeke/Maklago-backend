import type { NextFunction, Request, Response } from 'express';
import { verifyStaffToken } from '../auth/jwt';
import { sendErrorFromReq } from '../http/errorResponse';

export function requireStaff(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    sendErrorFromReq(req, res, 401, 'unauthorized', 'errors.unauthorized_missing_header');
    return;
  }
  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    sendErrorFromReq(req, res, 401, 'unauthorized', 'errors.unauthorized_missing_token');
    return;
  }

  try {
    const payload = verifyStaffToken(token);
    if (!req.tenant) {
      sendErrorFromReq(req, res, 401, 'unauthorized', 'errors.unauthorized_tenant_context');
      return;
    }
    if (payload.tenantId !== req.tenant.id) {
      sendErrorFromReq(req, res, 403, 'forbidden', 'errors.forbidden_tenant_mismatch');
      return;
    }
    req.staff = { id: payload.sub, role: payload.role };
    next();
  } catch {
    sendErrorFromReq(req, res, 401, 'unauthorized', 'errors.unauthorized_invalid_token');
  }
}
