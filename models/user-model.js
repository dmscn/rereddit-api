"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
exports.UserSchema = mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birth: {
        type: Date
    },
    points: {
        type: Number,
        required: false,
        default: 0
    },
    avatar: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.default.model('User', exports.UserSchema);
