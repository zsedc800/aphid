import webpack from 'webpack';
import getDevConfig from './webpack/web.dev';
import koaWebpack from './middlewares/koa-webpack';
export default {
    dev(app, context) {
        const webpackConfig = getDevConfig({
            context,
            entry: './index',
        });
        const compiler = webpack(webpackConfig);
        app.use(koaWebpack(compiler, {}));
    },
    web() { },
    node() { },
};
