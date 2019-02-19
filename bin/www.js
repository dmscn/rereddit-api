"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var server_1 = require("../lib/server");
var env_1 = require("../lib/env");
var logger_1 = require("../lib/logger");
logger_1.logger.info("Database URI: " + env_1.env.DATABASE);
mongoose_1.default
    .connect(env_1.env.DATABASE, { useCreateIndex: true, useNewUrlParser: true })
    .catch(function (err) {
    logger_1.logger.error("Error connecting to MongoDB: " + err);
    process.exit(1);
});
server_1.createServer().then(function (app) {
    app.listen(env_1.env.PORT, function () {
        var mode = env_1.env.NODE_ENV;
        logger_1.logger.debug("Server listening on " + env_1.env.PORT + " in " + mode + " mode");
    });
}, function (err) {
    logger_1.logger.error('Error while starting up server', err);
    process.exit(1);
});
