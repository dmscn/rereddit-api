import { createController } from 'awilix-koa';
// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
// eslint-disable-next-line no-unused-vars
import PostService from '../services/post-service';

/**
 * @apiDefine PostGroup Post endpoints
 *
 * Post are tree structured. A root Post has a title and does not have a `parent` attribute.
 * Replies are Post as well and are the chidlren of a root Post.
 * Replies have a `parent` attribute.
 */
const api = (postService: PostService) => ({
  /**
   * @api {GET} /post/:offset/:limit Get All
   * @apiGroup PostGroup
   * @apiParam {Number} offset Specify where the list start
   * @apiParam {Number} limit Specify where the list ends
   */
  findAll: async (ctx: Context) => {
    return ctx.ok(
      await postService.find({ offset: ctx.params.offset, limit: ctx.params.limit })
    );
  },

  /**
   * @api {GET} /post/search Search for Posts
   * @apiGroup PostGroup
   * @apiParam {Number} offset Specify where the list start
   * @apiParam {Number} limit Specify where the list ends
   */
  find: async (ctx: Context) => {
    return ctx.ok(await postService.find(ctx.request.body));
  },

  /**
   * @api {GET} /post/:id Get Single
   * @apiGroup PostGroup
   * @apiParam {String} id Id of the post to be found
   */
  findOneById: async (ctx: Context) => {
    return ctx.ok(await postService.findOneById(ctx.params.id));
  },

  /**
   * @api {POST} /post Create
   * @apiGroup PostGroup
   * @apiParam {String} title Title of the post
   * @apiParam {String} content Content of the post
   * @apiParam {String} author Id of the post author
   */
  create: async (ctx: Context) => {
    return ctx.created(await postService.create(ctx.request.body));
  },

  /**
   * @api {PUT} /post/:id Update
   * @apiGroup PostGroup
   * @apiParam {String} [author] Id of the post author
   * @apiParam {String} [title] Title of the post
   * @apiParam {String} [content] Content of the post
   */
  update: async (ctx: Context) => {
    return ctx.ok(await postService.update(ctx.params.id, ctx.request.body));
  },

  /**
   * @api {DELETE} /post/:id Remove
   * @apiGroup PostGroup
   * @apiParam {String} id Id of the post to be removed
   */
  remove: async (ctx: Context) => {
    return ctx.noContent(await postService.remove(ctx.params.id));
  },

  /**
   * @api {PATCH} /post/:id Reply
   * @apiGroup PostGroup
   * @apiParam {String} id Id of the post to be replied
   * @apiParam {String} content Content of the post
   */
  reply: async (ctx: Context) => {
    return ctx.created(await postService.reply(ctx.request.body));
  }
});

export default createController(api)
  .prefix('/posts')
  .get('', 'find')
  .get('/:offset/:limit', 'findAll')
  .post('/search', 'find')
  .get('/:id', 'findOneById')
  .post('', 'create')
  .put('/:id', 'update')
  .patch('/reply', 'reply')
  .delete('/:id', 'remove');
