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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var awilix_koa_1 = require("awilix-koa");
/**
 * @apiDefine PostGroup Post endpoints
 *
 * Post are tree structured. A root Post has a title and does not have a `parent` attribute.
 * Replies are Post as well and are the chidlren of a root Post.
 * Replies have a `parent` attribute.
 */
var api = function (postService) { return ({
    /**
     * @api {GET} /post/:offset/:limit Get All
     * @apiGroup PostGroup
     * @apiParam {Number} offset Specify where the list start
     * @apiParam {Number} limit Specify where the list ends
     */
    findAll: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).ok;
                    return [4 /*yield*/, postService.find({ offset: ctx.params.offset, limit: ctx.params.limit })];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); },
    /**
     * @api {GET} /post/search Search for Posts
     * @apiGroup PostGroup
     * @apiParam {Number} offset Specify where the list start
     * @apiParam {Number} limit Specify where the list ends
     */
    find: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).ok;
                    return [4 /*yield*/, postService.find(ctx.request.body)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); },
    /**
     * @api {GET} /post/:id Get Single
     * @apiGroup PostGroup
     * @apiParam {String} id Id of the post to be found
     */
    findOneById: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).ok;
                    return [4 /*yield*/, postService.findOneById(ctx.params.id)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); },
    /**
     * @api {POST} /post Create
     * @apiGroup PostGroup
     * @apiParam {String} title Title of the post
     * @apiParam {String} content Content of the post
     * @apiParam {String} author Id of the post author
     */
    create: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).created;
                    return [4 /*yield*/, postService.create(ctx.request.body)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); },
    /**
     * @api {PUT} /post/:id Update
     * @apiGroup PostGroup
     * @apiParam {String} [author] Id of the post author
     * @apiParam {String} [title] Title of the post
     * @apiParam {String} [content] Content of the post
     */
    update: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).ok;
                    return [4 /*yield*/, postService.update(ctx.params.id, ctx.request.body)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); },
    /**
     * @api {DELETE} /post/:id Remove
     * @apiGroup PostGroup
     * @apiParam {String} id Id of the post to be removed
     */
    remove: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).noContent;
                    return [4 /*yield*/, postService.remove(ctx.params.id)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); },
    /**
     * @api {PATCH} /post/:id Reply
     * @apiGroup PostGroup
     * @apiParam {String} id Id of the post to be replied
     * @apiParam {String} content Content of the post
     */
    reply: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = ctx).created;
                    return [4 /*yield*/, postService.reply(ctx.request.body)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    }); }
}); };
exports.default = awilix_koa_1.createController(api)
    .prefix('/posts')
    .get('', 'find')
    .get('/:offset/:limit', 'findAll')
    .post('/search', 'find')
    .get('/:id', 'findOneById')
    .post('', 'create')
    .put('/:id', 'update')
    .patch('/reply', 'reply')
    .delete('/:id', 'remove');
