import { Compiler } from 'webpack';
import { Context } from 'koa';
interface IDevOpt {
    logLevel: string;
    path: string;
    heartbeat: number;
    publicPath: string;
    log: any;
}
declare const _default: (compiler: Compiler, { path, heartbeat, publicPath, log, logLevel, }: IDevOpt) => (ctx: Context, next: Function) => Promise<void>;
export default _default;
