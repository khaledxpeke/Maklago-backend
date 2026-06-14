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

/**
 * Allow only staff who can use the kitchen app: chef, manager, owner.
 * Apply to kitchen routes.
 */
export const requireKitchenStaff = requireRole('chef', 'manager', 'owner');

/**
 * Block the chef role from cashier / backoffice routes.
 * Chef can only access kitchen routes and their own auth endpoints.
 * Apply after requireStaff on every non-kitchen protected router.
 */
export const denyChef = requireRole('cashier', 'manager', 'owner');
