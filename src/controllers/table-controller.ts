import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { knex } from '../database/knex';
import { AppError } from '@/utils/AppError';

class TableController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_number } = req.query;

      const query = knex<TableRepository>('tables')
        .select('table_number')
        .orderBy('table_number');

      if (table_number) {
        query.whereLike(`table_number`, `%${table_number ?? ''}%`);
      }

      const tables = await query;

      res.status(200).json({ tables });
    } catch (error) {
      return next(error);
    }
  }
}

export { TableController };
