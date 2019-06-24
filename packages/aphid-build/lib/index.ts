import webpack, { Configuration, Compiler } from 'webpack';
import getWebpackConfig from './webpack';
import koaWebpack from './middlewares/koa-webpack';
import Koa from 'koa';
export default (app: Koa) => {
  const webpackConfig: Configuration = getWebpackConfig();
  const compiler: Compiler = webpack(webpackConfig);
  app.use(koaWebpack(compiler, {}));
};
