import type { NextFunction, Request, Response } from 'express';
import { createTranslator, normalizeLang } from '../i18n';

/** Reads optional `lang` header (or `?lang=` query) and attaches `req.lang` + `req.t`. */
export function resolveLang(req: Request, res: Response, next: NextFunction): void {
  const headerLang = req.header('lang');
  const queryLang = typeof req.query.lang === 'string' ? req.query.lang : undefined;
  req.lang = normalizeLang(headerLang ?? queryLang);
  req.t = createTranslator(req.lang);
  res.setHeader('Content-Language', req.lang);
  next();
}
