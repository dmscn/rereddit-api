export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DATABASE: 'mongodb://localhost/chan',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || '8decd2f78f15d0ccf7d19244c6c22323',
  SECRET_KEY: process.env.SECRET_KEY || '6c594723ced3379657f2be73e2313cd8'
};
