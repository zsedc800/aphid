import { Context } from 'koa';

export default async (ctx: Context, next: Function) => {
  const { path } = ctx;
  console.log(path, 'Route middleware');

  if (/\/|index\.html/.test(path)) {
    ctx.status = 200;
    ctx.set({ 'Content-Type': 'text/html' });
    ctx.body = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="/app.js"></script>
  </body>
</html>
`;
  }
};
