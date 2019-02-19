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
exports.PostSchema = new mongoose_1.Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
    },
    date: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: String
    },
    replies: {
        // @ts-ignore
        type: [this],
        required: false
    }
});
exports.default = mongoose_1.default.model('Post', exports.PostSchema);
