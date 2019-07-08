import { Context } from 'koa';
declare const _default: (middlewares: Function[]) => (ctx: Context, next: Function) => any;
export default _default;
export { default as FetchMiddleware } from './fetch';
export { default as RenderMiddleware } from './render';
export { default as RouteMiddleware } from './route';
