"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const stream_1 = require("stream");
exports.default = (compiler, options) => {
    const middleware = webpack_hot_middleware_1.default(compiler, options);
    return async (ctx, next) => {
        const stream = new stream_1.PassThrough();
        ctx.body = stream;
        await middleware(ctx.req, {
            writeHead: (status, headers) => {
                ctx.status = status;
                ctx.set(headers);
            },
            write: stream.write.bind(stream),
        }, next);
    };
};
