import type { Request, Response } from 'express';

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown,
): void {
  const body: ApiErrorBody = { error: { code, message } };
  if (details !== undefined) body.error.details = details;
  res.status(status).json(body);
}

/** Send an error with a translated message when `req.t` is set. */
export function sendErrorFromReq(
  req: Pick<Request, 't'>,
  res: Response,
  status: number,
  code: string,
  messageKey: string,
  details?: unknown,
  vars?: Record<string, string | number>,
): void {
  const message = req.t ? req.t(messageKey, vars) : messageKey;
  sendError(res, status, code, message, details);
}
