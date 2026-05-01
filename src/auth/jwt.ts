import jwt, { type SignOptions } from 'jsonwebtoken';
import type { StaffRole } from '../db/tenant-client';
import { env } from '../config/env';

export type StaffTokenPayload = {
  sub: string;
  tenantId: string;
  role: StaffRole;
  typ: 'staff';
};

export function signStaffToken(payload: { staffId: string; tenantId: string; role: StaffRole }): string {
  const body: StaffTokenPayload = {
    sub: payload.staffId,
    tenantId: payload.tenantId,
    role: payload.role,
    typ: 'staff',
  };
  const signOpts: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] };
  return jwt.sign(body, env.jwtSecret, signOpts);
}

export function verifyStaffToken(token: string): StaffTokenPayload {
  const decoded = jwt.verify(token, env.jwtSecret);
  if (typeof decoded !== 'object' || decoded === null) {
    throw new Error('invalid_token');
  }
  const o = decoded as Record<string, unknown>;
  if (o.typ !== 'staff' || typeof o.sub !== 'string' || typeof o.tenantId !== 'string') {
    throw new Error('invalid_token');
  }
  return decoded as StaffTokenPayload;
}
