import Koa from 'koa';
import { resolve } from 'path';
import compiler from 'aphid-build';
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
  }
  public async prepare() {
    const context = resolve(this.dir);
    if (this.dev) {
      compiler(this.app, context);
    }
  }
}

export { Server };
