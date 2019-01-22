import { createController } from 'awilix-koa';
import { Context } from 'koa';

const api = postService => ({
  find: async (ctx: Context) => ctx.ok(await postService.find(ctx.query)),
  findOneById: async (ctx: Context) => ctx.ok(await postService.findOneById(ctx.params.id)),
  create: async (ctx: Context) => ctx.created(await postService.create(ctx.request.body)),
  update: async (ctx: Context) =>
    ctx.ok(await postService.update(ctx.params.id, ctx.request.body)),
  remove: async (ctx: Context) => ctx.noContent(await postService.remove(ctx.params.id)),
  reply: async (ctx: Context) =>
    ctx.created(
      await postService.reply(ctx.request.body, ctx.params.offset, ctx.params.limit)
    )
});

export default createController(api)
  .prefix('/posts')
  .get('', 'find')
  .get('/:offset/:limit', 'find')
  .get('/:id', 'findOneById')
  .post('', 'create')
  .put('/:id', 'update')
  .patch('/reply', 'reply')
  .delete('/:id', 'remove');
