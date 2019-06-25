import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { Compiler } from 'webpack';
import { Context } from 'koa';
import { KeyValueObject } from '../types';
import { PassThrough } from 'stream';

export default (compiler: Compiler, options: any) => {
  const devMid: Function = devMiddleware(compiler, options.devMiddleware);
  const hotMid: Function = hotMiddleware(compiler, options.hotMiddleware);
  return async (ctx: Context, next: Function) => {
    const stream: PassThrough = new PassThrough();
    ctx.body = stream;
    await devMid(
      ctx.req,
      {
        setHeader: (key: string, value: string) => {
          ctx.set(key, value);
        },
        send: (content: any) => {
          ctx.body = content;
        },
      },
      hotMid(
        ctx.req,
        {
          writeHead: (status: number, header: KeyValueObject) => {
            ctx.status = status;
            ctx.set(header);
          },
          write: stream.write.bind(stream),
        },
        next,
      ),
    );
  };
};
