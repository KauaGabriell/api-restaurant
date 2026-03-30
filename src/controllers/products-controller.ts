import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { knex } from '../database/knex';
import { AppError } from '@/utils/AppError';

class ProductController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json();
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(4),
        price: z.number().gt(0, { message: 'value must be grather than 0' }),
      });
      const product = bodySchema.parse(req.body);

      await knex('products').insert(product);
      return res.status(201).json(product);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}

export { ProductController };
