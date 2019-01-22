import { logger } from '../lib/logger';
// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
// eslint-disable-next-line no-unused-vars
import { NextFunction } from 'express';

export async function errorHandler(ctx: Context, next: NextFunction) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err.toJson ? err.toJson() : { message: err.message, ...err };
    logger.error('Error in request ', err);
  }
}
