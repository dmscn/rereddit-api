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

const authenticate = async (ctx: Context): Promise<any> => {
  let token = ctx.request.headers['x-access-token'] || ctx.request.headers['Authorization'];

  if (!token) return Forbidden.makeAssert('No Token Provided');
  if (!token.startsWith('Bearer ')) return Forbidden.makeAssert('Invalid Token');

  token = token.slice(7, token.length);

  try {
    await jwt.verify(token, env.AUTH_SECRET_KEY);
    return true;
  } catch (err) {
    return Forbidden.makeAssert('Invalid Token');
  }
};

export default authenticate;
