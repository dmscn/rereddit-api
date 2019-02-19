"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bristol_1 = require("bristol");
var palin_1 = __importDefault(require("palin"));
exports.logger = new bristol_1.Bristol();
exports.logger.addTarget('console').withFormatter(palin_1.default, {
    rootFolderName: 'forum-api'
});
