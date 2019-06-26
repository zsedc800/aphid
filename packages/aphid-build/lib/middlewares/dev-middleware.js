"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
exports.default = (compiler, options) => {
    const middleware = webpack_dev_middleware_1.default(compiler, options);
    return async (ctx, next) => {
        const res = {
            setHeader: (key, value) => {
                ctx.set(key, value);
            },
            send: (content) => {
                ctx.body = content;
            },
        };
        await middleware(ctx.req, res, next);
    };
};
