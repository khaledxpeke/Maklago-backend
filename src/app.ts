import './types/express-augment';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { sendError, sendErrorFromReq } from './http/errorResponse';
import { resolveLang } from './middleware/resolveLang';
import openapiDocument from './openapi/openapi.json';
import { apiV1Router } from './routes/api/v1';
import { platformRouter } from './routes/platform';

export function createApp(): express.Express {
  const app = express();

  const uploadsRoot = path.join(process.cwd(), 'uploads');
  fs.mkdirSync(uploadsRoot, { recursive: true });
  app.use('/uploads', express.static(uploadsRoot));

  if (env.corsOrigins.length > 0) {
    const corsOptions = {
      allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'x-platform-key', 'lang'],
    };
    if (env.corsOrigins[0] === '*') {
      app.use(cors({ origin: true, ...corsOptions }));
    } else {
      app.use(cors({ origin: env.corsOrigins, ...corsOptions }));
    }
  }

  app.use(express.json({ limit: '1mb' }));
  app.use(resolveLang);

  app.get('/openapi.json', (_req, res) => {
    res.json(openapiDocument);
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

  app.get('/', (_req, res) => {
    res.json({
      message: 'maklaGo API',
      docs: '/docs',
      openapiJson: '/openapi.json',
      tenantHeader: 'x-tenant-id',
      staffRealtime:
        'WebSocket GET /api/v1/realtime?token=<staff JWT> — order/table push events for cashier & kitchen',
    });
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', lang: req.lang });
  });

  app.use('/platform', platformRouter);
  app.use('/api/v1', apiV1Router);

  app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    sendErrorFromReq(req, res, 500, 'internal_error', 'errors.internal_error');
  });

  return app;
}
