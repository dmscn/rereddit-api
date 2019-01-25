export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DATABASE: 'mongodb://localhost/chan',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || ''
};
