import { Router } from 'express';
import { TableController } from '@/controllers/table-controller';

const tableRoutes = Router();
const tableController = new TableController();

tableRoutes.get('/', tableController.index);

export { tableRoutes };
