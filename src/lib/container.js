import { Lifetime, InjectionMode, createContainer, asValue } from 'awilix';
import { logger } from './logger';

const modulesToLoad = [['/services/*.js', Lifetime.SCOPED], ['/store/*.js', Lifetime.SINGLETON]];

/**
 * @returns {Object} The container
 */
export function configureContainer() {
	const options = {
		injectionMode: InjectionMode.CLASSIC
	};
	return createContainer(options)
		.loadModules(modulesToLoad, {
			cws: `${__dirname}/..`,
			formatName: 'camelCase'
		})
		.register({
			logger: asValue(logger)
		});
}
