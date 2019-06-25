"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
class Server {
    constructor({}) {
        this.app = new koa_1.default();
        this.init();
    }
    init() { }
}
exports.Server = Server;
