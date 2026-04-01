import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { knex } from '../database/knex';

class ProductController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;

      const query = knex<ProductRepository>('products')
        .select()
        .orderBy('name');

      if (name) {
        query.whereLike('name', `%${name ?? ''}%`);
      }

      const products = await query;

      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: 'Não foi encontrado nenhum produto!' });
      }

      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().gt(0, { message: 'value must be grather than 0' }),
      });
      const product = bodySchema.parse(req.body);

      await knex<ProductRepository>('products').insert(product);

      return res.status(201).json(product);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'Id must be a number' })
        .parse(req.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().gt(0, { message: 'value must be grather than 0' }),
      });

      const { name, price } = bodySchema.parse(req.body);

      const updatedRows = await knex<ProductRepository>('products')
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id: id });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado!' });
      }

      return res.status(200).json({ name, price });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export { ProductController };
