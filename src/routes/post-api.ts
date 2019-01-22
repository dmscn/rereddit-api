import { createController } from 'awilix-koa';
// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
// eslint-disable-next-line no-unused-vars
import PostService from '../services/post-service';

const api = (postService: PostService) => ({
  find: async (ctx: Context) =>
    ctx.ok(await postService.find({ offset: ctx.params.offset, limit: ctx.params.limit })),
  findOneById: async (ctx: Context) => ctx.ok(await postService.findOneById(ctx.params.id)),
  create: async (ctx: Context) => ctx.created(await postService.create(ctx.request.body)),
  update: async (ctx: Context) =>
    ctx.ok(await postService.update(ctx.params.id, ctx.request.body)),
  remove: async (ctx: Context) => ctx.noContent(await postService.remove(ctx.params.id)),
  reply: async (ctx: Context) => ctx.created(await postService.reply(ctx.request.body))
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
