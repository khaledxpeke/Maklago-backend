import { Router } from 'express';
import { platformAuthRouter } from './auth';
import { platformTenantsRouter } from './tenants';

export const platformRouter = Router();

platformRouter.use('/v1/auth', platformAuthRouter);
platformRouter.use('/v1/tenants', platformTenantsRouter);
