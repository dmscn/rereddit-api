import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import respond from 'koa-respond';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import { logger } from './logger';
import { configureContainer } from './container';
import { notFound } from '../middlewares/not-found';
import { errorHandler } from '../middlewares/error-handler';

/**
 * @returns {Promise<http.Server>} The configured App
 */
export async function createServer() {
	logger.debug('Creating Server...');

	const app = new Koa();

	const container = (app.container = configureContainer());

	app
		.use(errorHandler)
		.use(compress())
		.use(respond())
		.use(cors())
		.use(bodyParser())
		.use(scopePerRequest(container))
		.use(loadControllers('../routes/*.js', { cwd: __dirname }))
		.use(notFound);

	const server = http.createServer(app.callback());

	server.on('close', () => {
		logger.debug('Server Closing...');
	});

	logger.debug('Server created. Ready to listen.', { scope: 'startup' });
	return server;
}
