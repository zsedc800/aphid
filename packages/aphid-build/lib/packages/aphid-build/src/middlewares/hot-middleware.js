import hotMiddleware from 'webpack-hot-middleware';
import { PassThrough } from 'stream';
export default (compiler, options) => {
    const middleware = hotMiddleware(compiler, options);
    return async (ctx, next) => {
        const stream = new PassThrough();
        ctx.body = stream;
        await middleware(ctx.req, {
            writeHead: (status, headers) => {
                ctx.status = status;
                ctx.set(headers);
            },
            write: stream.write.bind(stream),
        }, next);
    };
};
