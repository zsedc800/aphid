import webpack, { Configuration, Compiler } from 'webpack';
import getDevConfig from './webpack/web.dev';
import koaWebpack from './middlewares/koa-webpack';
import Koa from 'koa';
export default {
  dev(app: Koa, context: string) {
    const webpackConfig: Configuration = getDevConfig({
      context,
      entry: './index.js',
    });
    const compiler: Compiler = webpack(webpackConfig);
    app.use(
      koaWebpack(compiler, {
        path: '__aphid_hmr',
        heartbeat: 5000,
        publicPath: '/',
        log: false,
        logLevel: 'error',
      }),
    );
  },
  web() {},
  node() {},
};
