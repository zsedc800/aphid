import devMiddleware from 'webpack-dev-middleware';
import { Compiler } from 'webpack';

export default (compiler: Compiler, options: any) => {
  const middleware = devMiddleware(compiler, options);
  return async (ctx, next) => {
    await middleware(
      ctx.req,
      {
        setHeader: (key, value) => {
          ctx.set(key, value);
        },
      },
      () => {},
    );
  };
};
