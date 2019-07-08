"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const web_dev_1 = __importDefault(require("./webpack/web.dev"));
const koa_webpack_1 = __importDefault(require("./middlewares/koa-webpack"));
const fs_1 = require("fs");
const path_1 = require("path");
const clear = () => process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
exports.default = {
    dev(app, context) {
        const webpackConfig = web_dev_1.default({
            context,
            entry: './index.js',
        });
        const compiler = webpack_1.default(webpackConfig);
        app.use(koa_webpack_1.default(compiler, {
            path: '__aphid_hmr',
            heartbeat: 5000,
            publicPath: '/',
            log: false,
            logLevel: 'info',
        }));
        compiler.hooks.invalid.tap('aphid-build', () => {
            clear();
        });
        compiler.hooks.done.tap('aphid-build', () => {
            fs_1.readFile(path_1.join(context || process.cwd(), './favicon.ico'), (err, data) => {
                const { outputFileSystem: mfs } = compiler;
                if (!err)
                    mfs.writeFile(path_1.join(context || process.cwd(), '/dist/favicon.ico'), data, (err) => {
                        if (!err)
                            console.log('write success');
                    });
            });
        });
        compiler.hooks.afterEmit.tap('aphid-build', (compliation) => {
            const { assets } = compliation;
            Object.keys(assets).forEach((filename) => {
                console.log('key++==');
                console.log(filename, 'files');
            });
        });
    },
    web() { },
    node() { },
};
