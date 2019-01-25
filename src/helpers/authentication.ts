import jwt from 'jsonwebtoken';
import { env } from '../lib/env';
import { Forbidden } from 'fejl';
import { Context } from 'koa';

export const hash = (password: string) => bcrypt.hash(password, 8);

export const generateToken = (email: string, hashPass: string) => {
  return jwt.sign({ id: `${email}:${hashPass}` }, env.AUTH_SECRET_KEY, {
    expiresIn: 86400 // expires in 24 hours
  });
};

export const verifyToken = (token: string) => jwt.verify(token, env.AUTH_SECRET_KEY);

const autheticationMiddleware = async (ctx: Context, next: Function): Promise<any> => {
  const token = ctx.request.headers['x-access-token'];
  if (!token) return Forbidden.makeAssert('No Token Provided');
  try {
    await jwt.verify(token, env.AUTH_SECRET_KEY);
    await next();
  } catch (err) {
    return Forbidden.makeAssert('Token Invalid');
  }
};
export default autheticationMiddleware;
