import { Request, Response, NextFunction, response } from 'express';

import { AppError } from '@/utils/AppError';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({message: error.message})
}
