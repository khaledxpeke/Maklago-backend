import { Router } from 'express';
import { attachTenantFromStaffJwt } from '../../../middleware/attachTenantFromStaffJwt';
import { tenantResolve } from '../../../middleware/tenantResolve';
import { authRouter } from './auth';
import { catalogRouter } from './catalog';
import { mobileOrdersRouter } from './mobileOrders';
import { ordersRouter } from './orders';
import { sessionsRouter } from './sessions';
import { settingsRouter } from './settings';
import { staffRouter } from './staff';
import { statsRouter } from './stats';
import { tableZonesRouter } from './tableZones';
import { tablesRouter } from './tables';

export const apiV1Router = Router();

apiV1Router.use(tenantResolve({ optional: true }));
apiV1Router.use(attachTenantFromStaffJwt());

apiV1Router.use('/auth', authRouter);
apiV1Router.use('/staff', staffRouter);
apiV1Router.use('/catalog', catalogRouter);
apiV1Router.use('/orders', ordersRouter);
apiV1Router.use('/mobile/orders', mobileOrdersRouter);
apiV1Router.use('/tables', tablesRouter);
apiV1Router.use('/table-zones', tableZonesRouter);
apiV1Router.use('/sessions', sessionsRouter);
apiV1Router.use('/stats', statsRouter);
apiV1Router.use('/settings', settingsRouter);
