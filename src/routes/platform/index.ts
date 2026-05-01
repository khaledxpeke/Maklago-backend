import { Router } from 'express';
import { platformAuthRouter } from './auth';
import { platformOwnersRouter } from './owners';
import { platformTenantsRouter } from './tenants';

export const platformRouter = Router();

platformRouter.use('/v1/auth', platformAuthRouter);
platformRouter.use('/v1/tenants', platformTenantsRouter);
platformRouter.use('/v1/owners', platformOwnersRouter);
