import type { NextFunction, Request, Response } from 'express';
import type { StaffRole } from '../db/tenant-client';
import { sendError } from '../http/errorResponse';

export function requireRole(...allowed: StaffRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.staff) {
      sendError(res, 401, 'unauthorized', 'Staff context required');
      return;
    }
    if (!allowed.includes(req.staff.role)) {
      sendError(res, 403, 'forbidden', 'Insufficient role');
      return;
    }
    next();
  };
}
