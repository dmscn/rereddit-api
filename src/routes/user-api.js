import { createController } from 'awilix-koa';

const api = userService => ({
  find: async ctx => ctx.ok(await userService.find(ctx.query)),
  findOneById: async ctx => ctx.ok(await userService.findOneById(ctx.params.id)),
  create: async ctx => ctx.created(await userService.create(ctx.request.body)),
  update: async ctx => ctx.ok(await userService.update(ctx.params.id, ctx.request.body)),
  remove: async ctx => ctx.noContent(await userService.remove(ctx.params.id))
});

export default createController(api)
  .prefix('/user')
  .get('', 'find')
  .get('/:id', 'findOneById')
  .post('', 'create')
  .put('/:id', 'update')
  .delete('/:id', 'remove');
