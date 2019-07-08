import Koa from 'koa';
import { resolve } from 'path';
import compiler from 'aphid-build';
import middlewareGlue, {
  FetchMiddleware,
  RenderMiddleware,
  RouteMiddleware,
} from './middlewares';
export type ServerConfiguration = {
  dir?: string;
  dev?: boolean;
  port?: number;
};

class Server {
  app: Koa;
  dir: string;
  port?: number;
  dev?: boolean;
  public constructor({ dir = '.', dev, port }: ServerConfiguration = {}) {
    this.app = new Koa();
    this.dir = dir;
    this.port = port;
    this.dev = dev;
    if (port) {
      this.app.use((ctx, next) => {
        console.log(ctx.path, 'before middlewares');
        return next();
      });
      this.prepare().then(() => {
        const { app } = this;
        app.use(this.handleRequest());
        app.use((ctx) => {
          console.log(ctx.path, 'after');
          ctx.body = '404 Not Found';
        });
        app.listen(port, () => {
          console.log(`server start at ${port}`);
        });
      });
    }
  }
  public async prepare() {
    const context = resolve(this.dir);
    if (this.dev) {
      compiler.dev(this.app, context);
    }
  }
  public handleRequest() {
    return middlewareGlue([RouteMiddleware, FetchMiddleware, RenderMiddleware]);
  }
}

export { Server };
