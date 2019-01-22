import { createController } from 'awilix-koa';
import { Context } from 'koa';

const api = userService => ({
  find: async (ctx: Context) => ctx.ok(await userService.find(ctx.query)),
  findOneById: async (ctx: Context) => ctx.ok(await userService.findOneById(ctx.params.id)),
  create: async (ctx: Context) => ctx.created(await userService.create(ctx.request.body)),
  update: async (ctx: Context) =>
    ctx.ok(await userService.update(ctx.params.id, ctx.request.body)),
  remove: async (ctx: Context) => ctx.noContent(await userService.remove(ctx.params.id))
});

export default createController(api)
  .prefix('/user')
  .get('', 'find')
  .get('/:id', 'findOneById')
  .post('', 'create')
  .put('/:id', 'update')
  .delete('/:id', 'remove');
