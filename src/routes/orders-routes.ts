import { Router } from 'express';
import { OrderController } from '@/controllers/orders-controller';

const ordersRoutes = Router();
const orderController = new OrderController();

ordersRoutes.get('/', orderController.index);
ordersRoutes.post('/', orderController.createOrder);

export { ordersRoutes };
