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
var authentication_1 = require("../helpers/authentication");
// import { decrypt } from '../helpers/authentication';
var assertId = fejl_1.BadRequest.makeAssert('No id given');
var UserService = /** @class */ (function () {
    function UserService(userStore) {
        this.userStore = userStore;
    }
    UserService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fejl_1.BadRequest.assert(email, 'No email given');
                        fejl_1.BadRequest.assert(password, 'No password given');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.find({ query: { email: email } })];
                    case 2:
                        user = (_a.sent())[0];
                        fejl_1.NotFound.assert(user, email + " not registered.");
                        // @ts-ignore
                        fejl_1.NotAuthenticated.assert(authentication_1.validatePassword(password, user.password), 'Invalid Password');
                        user.password = undefined;
                        return [4 /*yield*/, authentication_1.generateToken(user)];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                token: token
                            }];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: Implement Logout
                return [2 /*return*/, 'Logged Out'];
            });
        });
    };
    UserService.prototype.register = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, email, password, usersWithThisEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password;
                        return [4 /*yield*/, this.find({ data: { email: email } })];
                    case 1:
                        usersWithThisEmail = _a.sent();
                        fejl_1.BadRequest.assert(!usersWithThisEmail, email + " is already registered");
                        fejl_1.BadRequest.assert(firstName, 'No first name given');
                        fejl_1.BadRequest.assert(lastName, 'No last name given');
                        fejl_1.BadRequest.assert(email, 'No email given');
                        fejl_1.BadRequest.assert(password, 'No password given');
                        return [4 /*yield*/, this.userStore.create({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: password
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.find = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fejl_1.BadRequest.assert(data.query, 'No query given');
                        return [4 /*yield*/, this.userStore.find(data.query)];
                    case 1:
                        user = _a.sent();
                        fejl_1.NotFound.assert(user, 'User not found');
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.findOneById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertId(id);
                        return [4 /*yield*/, this.userStore.findOneById(id)];
                    case 1:
                        user = _a.sent();
                        fejl_1.NotFound.assert(user, "User with id " + id + " not found");
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.update = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assertId(id);
                        fejl_1.BadRequest.assert(user, 'No user given');
                        return [4 /*yield*/, this.userStore.update(id, user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assertId(id);
                return [2 /*return*/, this.userStore.remove(id)];
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
