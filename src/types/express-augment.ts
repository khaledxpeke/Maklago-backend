import type { StaffRole } from '../db/tenant-client';
import type { TenantContext } from './tenant';

declare global {
  namespace Express {
    interface Request {
      tenant?: TenantContext;
      staff?: {
        id: string;
        role: StaffRole;
      };
      /** Set by `platformAuth` for `/platform/*` routes */
      platformAdmin?: { id: string; email: string };
    }
  }
}

export {};
