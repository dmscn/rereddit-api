"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
var awilix_1 = require("awilix");
var logger_1 = require("./logger");
var modulesToLoad = [
    ['services/*.ts', awilix_1.Lifetime.SCOPED],
    ['stores/*.ts', awilix_1.Lifetime.SINGLETON]
];
/**
 * @returns {AwilixContainer} The container
 */
function configureContainer() {
    var options = {
        injectionMode: awilix_1.InjectionMode.CLASSIC
    };
    return awilix_1.createContainer(options)
        .loadModules(modulesToLoad, {
        cwd: __dirname + "/..",
        formatName: 'camelCase'
    })
        .register({
        logger: awilix_1.asValue(logger_1.logger)
    });
}
exports.configureContainer = configureContainer;
