import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type PlatformTokenPayload = {
  sub: string;
  email: string;
  typ: 'platform';
};

export function signPlatformToken(payload: { adminId: string; email: string }): string {
  const body: PlatformTokenPayload = {
    sub: payload.adminId,
    email: payload.email,
    typ: 'platform',
  };
  const signOpts: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'] };
  return jwt.sign(body, env.jwtSecret, signOpts);
}

export function verifyPlatformToken(token: string): PlatformTokenPayload {
  const decoded = jwt.verify(token, env.jwtSecret);
  if (typeof decoded !== 'object' || decoded === null) {
    throw new Error('invalid_token');
  }
  const o = decoded as Record<string, unknown>;
  if (o.typ !== 'platform' || typeof o.sub !== 'string' || typeof o.email !== 'string') {
    throw new Error('invalid_token');
  }
  return decoded as PlatformTokenPayload;
}
