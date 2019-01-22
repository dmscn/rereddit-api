import { Context } from 'koa';

export async function notFound(ctx: Context) {
  const msg = `${ctx.request.method} ${ctx.request.path}`;
  ctx.notFound({
    message: `No endpoint matched your request: ${msg}`
  });
}
