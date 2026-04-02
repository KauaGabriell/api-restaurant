import { Router } from 'express';
import { productsRoutes } from './products-routes';
import { tableRoutes } from './table-routes';
import { tablesSessionsRoutes } from './tables-session-routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/tables', tableRoutes);
routes.use('/tables-sessions', tablesSessionsRoutes);

export { routes };
