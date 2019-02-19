"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
var post_model_1 = __importDefault(require("../models/post-model"));
var PostStore = /** @class */ (function () {
    function PostStore(logger) {
        this.logger = logger;
    }
    PostStore.prototype.findAll = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug('Getting all the posts');
                        return [4 /*yield*/, post_model_1.default.find({ parent: null })
                                .skip(offset || 0)
                                .limit(limit || 20)
                                .sort({
                                date: 'asc'
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostStore.prototype.find = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Getting Post that satisfies: " + query);
                        return [4 /*yield*/, post_model_1.default.find(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostStore.prototype.findOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Getting post with id " + id);
                        return [4 /*yield*/, post_model_1.default.findById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostStore.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var newPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPost = new post_model_1.default(data);
                        this.logger.debug("Creating post with id " + newPost._id);
                        return [4 /*yield*/, newPost.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostStore.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Updating post with id " + id);
                        return [4 /*yield*/, this.findOneById(id)];
                    case 1:
                        post = _a.sent();
                        if (!post)
                            return [2 /*return*/, null];
                        post = __assign({}, post, data);
                        return [4 /*yield*/, post.save()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostStore.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Removing post with id " + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, post_model_1.default.findByIdAndRemove(id)];
                    case 2: return [2 /*return*/, (_a.sent()) || {}];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PostStore.prototype.reply = function (reply) {
        return __awaiter(this, void 0, void 0, function () {
            var parentPost, replyPost, err_2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Replying post with id " + reply.parent);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.logger.debug("Replying " + reply.parent + " with \n " + JSON.stringify(reply, null, 2) + " \n");
                        return [4 /*yield*/, post_model_1.default.findById(reply.parent)];
                    case 2:
                        parentPost = _a.sent();
                        replyPost = new post_model_1.default(reply);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, replyPost.save()];
                    case 4:
                        _a.sent();
                        parentPost.replies.push(replyPost);
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, new Error("Couldn't create reply")];
                    case 6: return [4 /*yield*/, parentPost.save()];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        error_1 = _a.sent();
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return PostStore;
}());
exports.default = PostStore;
