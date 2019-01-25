import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../lib/env';
import { Forbidden } from 'fejl';
import { Context } from 'koa';

export const hash = (str: string) => bcrypt.hash(str, 10);

export const generateToken = (key: Object) => {
  return jwt.sign(key, env.AUTH_SECRET_KEY, {
    expiresIn: 86400 // expires in 24 hours
  });
};

const autheticationMiddleware = async (ctx: Context, next: Function): Promise<any> => {
  let token = ctx.request.headers['x-access-token'] || ctx.request.headers['authorization'];

  if (!token) return Forbidden.makeAssert('No Token Provided');
  if (!token.startsWith('Bearer ')) return Forbidden.makeAssert('Invalid Token');

  token = token.slice(7, token.length);

  try {
    await jwt.verify(token, env.AUTH_SECRET_KEY);
    await next();
  } catch (err) {
    return Forbidden.makeAssert('Token Invalid');
  }
};

export default autheticationMiddleware;
