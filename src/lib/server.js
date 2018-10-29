import * as http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import { logger } from './logger';
import { configureContainer } from './container';

/**
 * @returns {Promise<http.Server>} The configured App
 */
export async function createServer() {
	logger.debug('Creating Server...');

	const app = new Koa();

	const container = (app.container = configureContainer());

	app
		.use(bodyParser())
		.use(scopePerRequest(container))
		.use(loadControllers('../routes/*.js', { cwd: __dirname }));

	const server = http.createServer(app.callback());

	server.on('close', () => {
		logger.debug('Server Closing...');
	});

	logger.debug('Server created. Ready to listen.', { scope: 'startup' });
	return server;
}
