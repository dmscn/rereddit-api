import jwt from 'jsonwebtoken';
import { env } from '../lib/env';
import { Forbidden } from 'fejl';
import { Context } from 'koa';
import crypto from 'crypto-js';

export const encrypt = (data: any) => crypto.AES.encrypt(data, env.SECRET_KEY).toString();
export const decrypt = (data: any) =>
  crypto.AES.decrypt(data, env.SECRET_KEY).toString(crypto.enc.Utf8);

export const validatePassword = (password: string, hash: string): boolean =>
  password === decrypt(hash);

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
