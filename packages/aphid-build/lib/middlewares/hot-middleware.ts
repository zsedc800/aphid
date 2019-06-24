import hotMiddleware from 'webpack-hot-middleware';
import { Compiler } from 'webpack';
import { Context } from 'koa';
import { KeyValueObject } from '../types';
import { PassThrough } from 'stream';

export default (compiler: Compiler, options: any) => {
  const middleware: Function = hotMiddleware(compiler, options);
  return async (ctx: Context, next: Function) => {
    const stream: PassThrough = new PassThrough();
    ctx.body = stream;
    await middleware(
      ctx.req,
      {
        writeHead: (status: number, headers: KeyValueObject) => {
          ctx.status = status;
          ctx.set(headers);
        },
        write: stream.write.bind(stream),
      },
      next,
    );
  };
};
