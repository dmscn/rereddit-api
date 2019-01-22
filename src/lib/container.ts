// eslint-disable-next-line no-unused-vars
import { Lifetime, InjectionMode, createContainer, asValue, AwilixContainer } from 'awilix';
import { logger } from './logger';

const modulesToLoad: any = [
  ['services/*.ts', Lifetime.SCOPED],
  ['stores/*.ts', Lifetime.SINGLETON]
];

/**
 * @returns {AwilixContainer} The container
 */
export function configureContainer(): AwilixContainer {
  const options: any = {
    injectionMode: InjectionMode.CLASSIC
  };
  return createContainer(options)
    .loadModules(modulesToLoad, {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase'
    })
    .register({
      logger: asValue(logger)
    });
}
