import { Request, Response, NextFunction } from 'express';
import { knex } from '../database/knex';
import { z } from 'zod';
import { AppError } from '@/utils/AppError';

class TableSessionController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionRepository>('tables_sessions')
        .select()
        .orderBy('closed_at')
        .returning('*');

      if (!sessions)
        throw new AppError('Não foi encontrada nenhuma mesa aberta');

      return res.status(200).json({ sessions });
    } catch (error) {
      next(error);
    }
  }

  async createTableSession(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(req.body);

      const tables = await knex<TableRepository>('tables')
        .where({ id: table_id })
        .first();

      if (!tables) throw new AppError('Mesa não encontrada', 404);

      const sessions = await knex<TableSessionRepository>('tables_sessions')
        .where({ table_id })
        .orderBy('opened_at', 'desc')
        .first();

      if (sessions && !sessions.closed_at)
        throw new AppError('Essa mesa já está aberta');

      const tableSession = await knex<TableSessionRepository>(
        'tables_sessions',
      ).insert({
        table_id,
        opened_at: knex.fn.now(),
      });
      return res.status(201).json({ tableSession });
    } catch (error) {
      next(error);
    }
  }

  async updateSession(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: 'Id must be a number' })
        .parse(req.params.id);

      const session = await knex<TableSessionRepository>('tables_sessions')
        .where({ id })
        .first();

      if (!session) throw new AppError('This session table not exist');

      if (session?.closed_at)
        throw new AppError('This table session is closed');

      const [updatedSession] = await knex<TableSessionRepository>(
        'tables_sessions',
      )
        .update({
          closed_at: knex.fn.now(),
        })
        .where({ id })
        .returning('*');

      return res.status(200).json({ updatedSession });
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionController };
