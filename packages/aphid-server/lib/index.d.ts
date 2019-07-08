import Koa from 'koa';
export declare type ServerConfiguration = {
    dir?: string;
    dev?: boolean;
    port?: number;
};
declare class Server {
    app: Koa;
    dir: string;
    port?: number;
    dev?: boolean;
    constructor({ dir, dev, port }?: ServerConfiguration);
    prepare(): Promise<void>;
    handleRequest(): (ctx: Koa.Context, next: Function) => any;
}
export { Server };
