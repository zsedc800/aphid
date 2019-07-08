import { Context } from 'koa';

export default (middlewares: Array<Function>) => {
  const { length } = middlewares;
  return (ctx: Context, next: Function) => {
    let i = 0;
    console.log('start core middleware');

    const itNext = (ctx: Context) => {
      if (i >= length) return next();
      const middleware = middlewares[i];
      i++;
      return middleware(ctx, itNext);
    };
    return itNext(ctx);
  };
};

export { default as FetchMiddleware } from './fetch';
export { default as RenderMiddleware } from './render';
export { default as RouteMiddleware } from './route';
