import Koa from 'koa';
import { Compiler } from 'webpack';
declare const _default: (compiler: Compiler, options: any) => (ctx: Koa.Context, next: Function) => Promise<void>;
export default _default;
