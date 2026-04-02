import { Router } from 'express';
import { TableSessionController } from '@/controllers/tables-sessions-controller';

const tablesSessionsRoutes = Router();
const tableSessionController = new TableSessionController();

tablesSessionsRoutes.get('/', tableSessionController.index);
tablesSessionsRoutes.post('/', tableSessionController.createTableSession);

export { tablesSessionsRoutes };
