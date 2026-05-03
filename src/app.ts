import './types/express-augment';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { sendError } from './http/errorResponse';
import openapiDocument from './openapi/openapi.json';
import { apiV1Router } from './routes/api/v1';
import { platformRouter } from './routes/platform';

export function createApp(): express.Express {
  const app = express();

  const uploadsRoot = path.join(process.cwd(), 'uploads');
  fs.mkdirSync(uploadsRoot, { recursive: true });
  app.use('/uploads', express.static(uploadsRoot));

  if (env.corsOrigins.length > 0) {
    if (env.corsOrigins[0] === '*') {
      app.use(cors({ origin: true }));
    } else {
      app.use(cors({ origin: env.corsOrigins }));
    }
  }

  app.use(express.json({ limit: '1mb' }));

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

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/platform', platformRouter);
  app.use('/api/v1', apiV1Router);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    sendError(res, 500, 'internal_error', 'Internal server error');
  });

  return app;
}
