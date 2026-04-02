import { Request, Response, NextFunction } from 'express';
import { knex } from '../database/knex';

class TableSessionController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: 'Ok - Testando' });
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionController };
