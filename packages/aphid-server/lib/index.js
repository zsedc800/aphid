"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const path_1 = require("path");
const aphid_build_1 = __importDefault(require("aphid-build"));
const middlewares_1 = __importStar(require("./middlewares"));
class Server {
    constructor({ dir = '.', dev, port } = {}) {
        this.app = new koa_1.default();
        this.dir = dir;
        this.port = port;
        this.dev = dev;
        if (port) {
            this.app.use((ctx, next) => {
                console.log(ctx.path, 'before middlewares');
                return next();
            });
            this.prepare().then(() => {
                const { app } = this;
                app.use(this.handleRequest());
                app.use((ctx) => {
                    console.log(ctx.path, 'after');
                    ctx.body = '404 Not Found';
                });
                app.listen(port, () => {
                    console.log(`server start at ${port}`);
                });
            });
        }
    }
    async prepare() {
        const context = path_1.resolve(this.dir);
        if (this.dev) {
            aphid_build_1.default.dev(this.app, context);
        }
    }
    handleRequest() {
        return middlewares_1.default([middlewares_1.RouteMiddleware, middlewares_1.FetchMiddleware, middlewares_1.RenderMiddleware]);
    }
}
exports.Server = Server;
