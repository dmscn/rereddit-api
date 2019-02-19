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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var awilix_koa_1 = require("awilix-koa");
var authentication_1 = __importDefault(require("../helpers/authentication"));
var fejl_1 = require("fejl");
/**
 * @apiDefine UserGroup User enpoints
 *
 *
 */
var api = function (userService) { return ({
    /**
     * @api {POST} /login Sign in user
     * @apiGroup AuthGroup
     * @apiParam {String} email Email
     * @apiParam {String} Password Password
     */
    login: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = ctx.request.body, email = _a.email, password = _a.password;
                    _c = (_b = ctx).ok;
                    return [4 /*yield*/, userService.login(email, password)];
                case 1: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    }); },
    /**
     * @api {GET} /logout
     * @apiGroup AuthGroup
     */
    logout: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).ok;
                    return [4 /*yield*/, userService.logout()];
                case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    }); },
    /**
     * @api {POST} /user Create
     * @apiGroup UserGroup
     * @apiParam {String} nome First Name
     * @apiParam {String} email Email
     * @apiParam {String} [avatar] Image Base64 or URL
     * @apiParam {Number} [points] Points
     */
    register: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).ok;
                    return [4 /*yield*/, userService.register(ctx.request.body)];
                case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    }); },
    /**
     * @api {GET} /user/ Get Users
     * @apiGroup UserGroup
     * @apiParam {String} [query] Query to find the users
     */
    find: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = fejl_1.Forbidden).assert;
                    return [4 /*yield*/, authentication_1.default(ctx)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = ctx).ok;
                    return [4 /*yield*/, userService.find(JSON.parse(ctx.request.body.query))];
                case 2: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
            }
        });
    }); },
    /**
     * @api {GET} /user/:id Get Single
     * @apiGroup UserGroup
     * @apiParam {String} id Id of the post to be found
     */
    findOneById: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = fejl_1.Forbidden).assert;
                    return [4 /*yield*/, authentication_1.default(ctx)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = ctx).ok;
                    return [4 /*yield*/, userService.findOneById(ctx.params.id)];
                case 2: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
            }
        });
    }); },
    /**
     * @api {PUT} /user Update
     * @apiGroup UserGroup
     * @apiParam {String} [name] First Name
     * @apiParam {String} [email] Email
     * @apiParam {String} [avatar] Image Base64 or URL
     */
    update: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = fejl_1.Forbidden).assert;
                    return [4 /*yield*/, authentication_1.default(ctx)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = ctx).ok;
                    return [4 /*yield*/, userService.update(ctx.params.id, ctx.request.body)];
                case 2: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
            }
        });
    }); },
    /**
     * @api {DELETE} /user Remove
     * @apiGroup UserGroup
     * @apiParam {String} id Id of the User to remove
     */
    remove: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = fejl_1.Forbidden).assert;
                    return [4 /*yield*/, authentication_1.default(ctx)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = ctx).noContent;
                    return [4 /*yield*/, userService.remove(ctx.params.id)];
                case 2: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
            }
        });
    }); }
}); };
exports.default = awilix_koa_1.createController(api)
    .prefix('/user')
    .post('/login', 'login')
    .post('/register', 'register')
    .get('/logout', 'logout')
    .get('', 'find')
    .get('/:id', 'findOneById')
    .put('/:id', 'update')
    .delete('/:id', 'remove');
