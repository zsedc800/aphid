import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { PassThrough } from 'stream';
export default (compiler, options) => {
    const devMid = devMiddleware(compiler, options.devMiddleware);
    const hotMid = hotMiddleware(compiler, options.hotMiddleware);
    return async (ctx, next) => {
        const stream = new PassThrough();
        ctx.body = stream;
        await devMid(ctx.req, {
            setHeader: (key, value) => {
                ctx.set(key, value);
            },
            send: (content) => {
                ctx.body = content;
            },
        }, hotMid(ctx.req, {
            writeHead: (status, header) => {
                ctx.status = status;
                ctx.set(header);
            },
            write: stream.write.bind(stream),
        }, next));
    };
};
