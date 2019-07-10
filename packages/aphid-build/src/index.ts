import webpack, { Configuration, Compiler } from 'webpack';
import getDevConfig from './webpack/web.dev';
import koaWebpack from './middlewares/koa-webpack';
import Koa from 'koa';
import { fstat, readFile } from 'fs';
import { join } from 'path';
const clear = () =>
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H',
  );
export default {
  dev(app: Koa, context: string) {
    const webpackConfig: Configuration = getDevConfig({
      context,
      entry: './index.js',
    });
    const compiler: Compiler = webpack(webpackConfig);
    app.use(
      koaWebpack(compiler, {
        path: '/__aphid_hmr',
        heartbeat: 5000,
        publicPath: '/',
        log: false,
        logLevel: 'info',
      }),
    );
    compiler.hooks.invalid.tap('aphid-build', () => {
      clear();
    });

    compiler.hooks.done.tap('aphid-build', () => {
      readFile(join(context || process.cwd(), './favicon.ico'), (err, data) => {
        const { outputFileSystem: mfs } = compiler;
        if (!err)
          mfs.writeFile(
            join(context || process.cwd(), '/dist/favicon.ico'),
            data,
            (err) => {
              if (!err) console.log('write success');
            },
          );
      });
    });

    compiler.hooks.afterEmit.tap('aphid-build', (compliation) => {
      const { assets } = compliation;
      Object.keys(assets).forEach((filename: string) => {
        console.log('key++==');

        console.log(filename, 'files');
      });
    });
  },
  web() {},
  node() {},
};
