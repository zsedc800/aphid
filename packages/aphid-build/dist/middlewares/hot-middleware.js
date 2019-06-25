"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const stream_1 = require("stream");
exports.default = (compiler, options) => {
    const middleware = webpack_hot_middleware_1.default(compiler, options);
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const stream = new stream_1.PassThrough();
        ctx.body = stream;
        yield middleware(ctx.req, {
            writeHead: (status, headers) => {
                ctx.status = status;
                ctx.set(headers);
            },
            write: stream.write.bind(stream),
        }, next);
    });
};
