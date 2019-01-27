import jwt from 'jsonwebtoken';
import { env } from '../lib/env';
import { Forbidden } from 'fejl';
import crypto from 'crypto-js';
import { logger } from '../lib/logger';
import { Context } from 'koa';

export const encrypt = (data: any) => crypto.AES.encrypt(data, env.SECRET_KEY).toString();
export const decrypt = (data: any) =>
  crypto.AES.decrypt(data, env.SECRET_KEY).toString(crypto.enc.Utf8);

export const validatePassword = (password: string, hash: string): boolean =>
  password === decrypt(hash);

export const generateToken = (data: Object) =>
  jwt.sign({ data }, env.AUTH_SECRET_KEY, {
    expiresIn: 86400 // expires in 24 hours
  });

const authenticate = async (ctx: Context): Promise<any> => {
  let token = ctx.request.headers.authorization;

  logger.debug(`Validating JWT: ${token}`);

  Forbidden.assert(token, 'No Token Provided');
  Forbidden.assert(token.startsWith('Bearer '), 'Invalid Token');

  token = token.slice(7, token.length);
  return jwt.verify(token, env.AUTH_SECRET_KEY);
};

export default authenticate;
