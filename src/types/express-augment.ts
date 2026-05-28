import type { StaffRole } from '../db/tenant-client';
import type { AppLang } from '../config/languages';
import type { TranslateFn } from '../i18n';
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
      /** Resolved from `lang` header (default `fr`). */
      lang?: AppLang;
      /** Translate UI / error strings for the resolved language. */
      t?: TranslateFn;
    }
  }
}

export {};
