'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const webpack_1 = __importDefault(require('webpack'));
const web_dev_1 = __importDefault(require('./webpack/web.dev'));
const koa_webpack_1 = __importDefault(require('./middlewares/koa-webpack'));
exports.default = {
  dev(app, context) {
    const webpackConfig = web_dev_1.default({
      context,
      entry: './index.js',
    });
    const compiler = webpack_1.default(webpackConfig);
    app.use(
      koa_webpack_1.default(compiler, {
        path: '__aphid_hmr',
        heartbeat: 5000,
        publicPath: '/',
        log: false,
        logLevel: 'info',
      }),
    );
  },
  web() {},
  node() {},
};
