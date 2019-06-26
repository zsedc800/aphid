"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const path_1 = require("path");
const aphid_build_1 = __importDefault(require("aphid-build"));
class Server {
    constructor({ dir = '.', dev, port } = {}) {
        this.app = new koa_1.default();
        this.dir = dir;
        this.port = port;
        this.dev = dev;
        if (port) {
            this.prepare().then(() => {
                this.app.listen(port, () => {
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
}
exports.Server = Server;
