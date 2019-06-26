import webpack, { Configuration, Compiler } from 'webpack';
import getDevConfig from './webpack/web.dev';
import koaWebpack from './middlewares/koa-webpack';
import Koa from 'koa';
export default {
  dev(app: Koa, context: string) {
    const webpackConfig: Configuration = getDevConfig({
      context,
      entry: './index',
    });
    const compiler: Compiler = webpack(webpackConfig);
    app.use(koaWebpack(compiler, {}));
  },
  web() {},
  node() {},
};
