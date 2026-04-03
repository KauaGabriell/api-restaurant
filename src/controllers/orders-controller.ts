import { Request, Response, NextFunction } from 'express';
import { number, z } from 'zod';
import { knex } from '../database/knex';
import { AppError } from '@/utils/AppError';

class OrderController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z
        .string()
        .transform((value) => Number(value))
        .parse(req.params.table_session_id);

      console.log(table_session_id);
      console.log(typeof table_session_id);

      const orders = await knex<OrderRepository>('orders')
        .select(
          'orders.id',
          'orders.table_session_id',
          'product_id',
          'products.name',
          'orders.price',
          'orders.quantity',
          knex.raw('(orders.price * orders.quantity) as Total'),
          'orders.created_at',
          'orders.updated_at',
        )
        .join('products', 'products.id', 'orders.product_id')
        .where({ table_session_id })
        .orderBy('orders.created_at', 'desc');

      return res.status(200).json({ orders });
    } catch (error) {
      next(error);
    }
  }
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body,
      );

      //Validações de Sessão(Verifica se existe)
      const session = await knex<TableSessionRepository>('tables_sessions')
        .where({ id: table_session_id })
        .first();

      if (!session) throw new AppError('session table not found');
      if (session.closed_at) throw new AppError('this table is closed');

      //Validações de Produto(Verifica se existe)
      const product = await knex<ProductRepository>('products')
        .where({ id: product_id })
        .first();

      if (!product) throw new AppError('product not found');

      const order = await knex<OrderRepository>('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return res.status(201).json({ message: 'order successful ' });
    } catch (error) {
      next(error);
    }
  }
}

export { OrderController };
