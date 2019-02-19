"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var koa_1 = __importDefault(require("koa"));
var cors_1 = __importDefault(require("@koa/cors"));
var koa_respond_1 = __importDefault(require("koa-respond"));
var koa_compress_1 = __importDefault(require("koa-compress"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var koa_session_1 = __importDefault(require("koa-session"));
var awilix_koa_1 = require("awilix-koa");
var logger_1 = require("./logger");
var container_1 = require("./container");
var not_found_1 = require("../middlewares/not-found");
var error_handler_1 = require("../middlewares/error-handler");
/**
 * @returns {Promise<http.Server>} The configured App
 */
function createServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, container, server;
        return __generator(this, function (_a) {
            logger_1.logger.debug('Creating Server...');
            app = new koa_1.default();
            container = (app.container = container_1.configureContainer());
            app
                .use(error_handler_1.errorHandler)
                .use(koa_compress_1.default())
                .use(koa_respond_1.default())
                .use(cors_1.default())
                .use(koa_bodyparser_1.default())
                .use(koa_session_1.default(app))
                .use(awilix_koa_1.scopePerRequest(container))
                .use(awilix_koa_1.loadControllers('../routes/*.ts', { cwd: __dirname }))
                .use(not_found_1.notFound);
            server = http.createServer(app.callback());
            server.on('close', function () {
                logger_1.logger.debug('Server Closing...');
            });
            logger_1.logger.debug('Server created. Ready to listen.', { scope: 'startup' });
            return [2 /*return*/, server];
        });
    });
}
exports.createServer = createServer;
