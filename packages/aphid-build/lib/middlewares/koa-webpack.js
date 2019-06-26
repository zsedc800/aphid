"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const stream_1 = require("stream");
exports.default = (compiler, { path = '__aphid_hmr', heartbeat = 5000, publicPath = '/', log = false, logLevel = 'error', }) => {
    const devMid = webpack_dev_middleware_1.default(compiler, { logLevel, publicPath });
    const hotMid = webpack_hot_middleware_1.default(compiler, { log, heartbeat, path });
    return async (ctx, next) => {
        const stream = new stream_1.PassThrough();
        ctx.body = stream;
        await devMid(ctx.req, {
            setHeader: (key, value) => {
                ctx.set(key, value);
            },
            send: (content) => {
                ctx.body = content;
            },
        }, () => hotMid(ctx.req, {
            writeHead: (status, header) => {
                ctx.status = status;
                ctx.set(header);
            },
            write: stream.write.bind(stream),
        }, next));
    };
};
