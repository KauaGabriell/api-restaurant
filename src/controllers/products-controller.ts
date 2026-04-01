import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { knex } from '../database/knex';
import { AppError } from '@/utils/AppError';

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
        throw new AppError('Não foi encontrado nenhum produto!', 404);
      }

      return res.status(200).json(products);
    } catch (error: any) {
      return next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().gt(0, { message: 'value must be grather than 0' }),
      });
      const product = bodySchema.parse(req.body);

      await knex<ProductRepository>('products').insert(product);

      return res.status(201).json(product);
    } catch (e: any) {
      return next(e);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
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
        throw new AppError('Produto não encontrado!', 404);
      }

      return res.status(200).json({ name, price });
    } catch (error: any) {
      return next(error);
    }
  }

  async removeProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'Id must be a number' })
        .parse(req.params.id);

      const deletedRows = await knex<ProductRepository>('products')
        .delete()
        .where({ id });

      if (deletedRows === 0) {
        throw new AppError('Produto não encontrado!', 404);
      }

      return res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error: any) {
      return next(error);
    }
  }
}

export { ProductController };
