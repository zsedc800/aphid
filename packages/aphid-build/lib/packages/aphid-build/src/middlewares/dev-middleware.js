import devMiddleware from 'webpack-dev-middleware';
export default (compiler, options) => {
    const middleware = devMiddleware(compiler, options);
    return async (ctx, next) => {
        const res = {
            setHeader: (key, value) => {
                ctx.set(key, value);
            },
            send: (content) => {
                ctx.body = content;
            },
        };
        await middleware(ctx.req, res, next);
    };
};
