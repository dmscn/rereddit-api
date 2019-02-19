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
Object.defineProperty(exports, "__esModule", { value: true });
var fejl_1 = require("fejl");
var assertId = fejl_1.BadRequest.makeAssert('No id given');
/**
 * @class PostService
 * @argument store
 *
 * Post are tree structured. A root Post has a title and does not have a `parent` attribute
 * Replies are Post as well and are the chidlren of a root Post
 * Replies have a `parent` attribute
 */
var PostService = /** @class */ (function () {
    function PostService(postStore) {
        this.postStore = postStore;
    }
    /**
     * @param {Number} [offset] Specify where the list start
     * @param {Number} [limit] Specify where the list ends
     * @returns {Promise<any>} List with all the Posts
     */
    PostService.prototype.findAll = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postStore.findAll(offset, limit)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @param {Object} query Query to get a specific Post
     * @returns {Promise<any>} List with all the Posts
     */
    PostService.prototype.find = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fejl_1.BadRequest.assert(data, 'No query given');
                        return [4 /*yield*/, this.postStore.find(data)];
                    case 1:
                        posts = _a.sent();
                        if (posts.length === 0)
                            posts = null;
                        fejl_1.NotFound.assert(posts, "No Posts found with query " + data);
                        return [2 /*return*/, posts];
                }
            });
        });
    };
    /**
     * @param {String} id Id of the post
     * @returns {Promise<any>} The Post found
     */
    PostService.prototype.findOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertId(id);
                        return [4 /*yield*/, this.postStore.findOneById(id)];
                    case 1:
                        post = _a.sent();
                        fejl_1.NotFound.assert(post || null, "No Post found with id " + id);
                        return [2 /*return*/, post];
                }
            });
        });
    };
    /**
     * @param {Post} post The Post that will be created
     * @returns {Promise<any>} Created Post
     */
    PostService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fejl_1.BadRequest.assert(data.title, 'No title given');
                        fejl_1.BadRequest.assert(data.content, 'No content given');
                        fejl_1.BadRequest.assert(data.author, 'No author given');
                        return [4 /*yield*/, this.postStore.create(data)];
                    case 1:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    /**
     * @param {Post} post The Post that will be updated
     * @returns {Promise<any>} Updated Post
     */
    PostService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertId(id);
                        fejl_1.BadRequest.assert(data, 'No Post data given');
                        return [4 /*yield*/, this.postStore.update(id, data)];
                    case 1:
                        post = _a.sent();
                        fejl_1.NotFound.assert(post || null, "No Post found with id " + id);
                        return [2 /*return*/, post];
                }
            });
        });
    };
    /**
     * @param {Post} post The reply Post containing the parent that will be replied
     * @returns {Promise<any>} The parent Post with it's replies
     */
    PostService.prototype.reply = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fejl_1.BadRequest.assert(data.parent, 'No parent post reference given');
                        fejl_1.BadRequest.assert(data.content, 'No content given');
                        return [4 /*yield*/, this.postStore.reply(data)];
                    case 1:
                        post = _a.sent();
                        fejl_1.NotFound.assert(post, "No parent Post found with id " + data.parent);
                        return [2 /*return*/, post];
                }
            });
        });
    };
    /**
     * @param {String} id Id of the Post that will be removed
     * @returns {Promise<any>} Empty Post
     */
    PostService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertId(id);
                        return [4 /*yield*/, this.postStore.remove(id)];
                    case 1:
                        result = _a.sent();
                        fejl_1.NotFound.assert(result, "No Post found with id " + id);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return PostService;
}());
exports.default = PostService;
