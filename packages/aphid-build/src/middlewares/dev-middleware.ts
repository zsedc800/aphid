import devMiddleware from 'webpack-dev-middleware';
import Koa from 'koa';
import { Compiler } from 'webpack';

export default (compiler: Compiler, options: any) => {
  const middleware: Function = devMiddleware(compiler, options);
  return async (ctx: Koa.Context, next: Function) => {
    const res: any = {
      setHeader: (key: string, value: any) => {
        ctx.set(key, value);
      },
      send: (content: any) => {
        ctx.body = content;
      },
    };
    await middleware(ctx.req, res, next);
  };
};
