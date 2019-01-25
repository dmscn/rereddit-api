import mongoose from 'mongoose';
import { createServer } from '../lib/server';
import { env } from '../lib/env';
import { logger } from '../lib/logger';

mongoose.connect(env.DATABASE, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on('error', () => {
  logger.error('Error connecting to MongoDB');
  process.exit(1);
});

createServer().then(
  app => {
    app.listen(env.PORT, () => {
      const mode = env.NODE_ENV;
      logger.debug(`Server listening on ${env.PORT} in ${mode} mode`);
    });
  },
  err => {
    logger.error('Error while starting up server', err);
    process.exit(1);
  }
);
