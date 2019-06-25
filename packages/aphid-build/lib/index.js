"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_2 = __importDefault(require("./webpack"));
const koa_webpack_1 = __importDefault(require("./middlewares/koa-webpack"));
exports.default = (app) => {
    const webpackConfig = webpack_2.default();
    const compiler = webpack_1.default(webpackConfig);
    app.use(koa_webpack_1.default(compiler, {}));
};
