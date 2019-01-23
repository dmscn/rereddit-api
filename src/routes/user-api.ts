import { createController } from 'awilix-koa';
// eslint-disable-next-line no-unused-vars
import { Context } from 'koa';
import UserService from '../services/user-service';

/**
 * @apiDefine UserGroup User enpoints
 *
 *
 */
const api = (userService: UserService) => ({
  /**
   * @api {GET} /user/:id Get Single
   * @apiGroup UserGroup
   * @apiParam {String} id Id of the post to be found
   */
  findOneById: async (ctx: Context) => {
    return ctx.ok(await userService.findOneById(ctx.params.id));
  },

  /**
   * @api {POST} /user Create
   * @apiGroup UserGroup
   * @apiParam {String} nome User first name
   * @apiParam {String} email User email
   * @apiParam {String} avatar Image Base64 or URL
   */
  create: async (ctx: Context) => {
    return ctx.created(await userService.create(ctx.request.body));
  },

  /**
   * @api {PUT} /user Update
   * @apiGroup UserGroup
   * @apiParam {String} [nome] User first name
   * @apiParam {String} [email] User email
   * @apiParam {String} [avatar] Image Base64 or URL
   */
  update: async (ctx: Context) => {
    return ctx.ok(await userService.update(ctx.params.id, ctx.request.body));
  },

  /**
   * @api {DELETE} /user Remove
   * @apiGroup UserGroup
   * @apiParam {String} id Id of the User to remove
   */
  remove: async (ctx: Context) => {
    return ctx.noContent(await userService.remove(ctx.params.id));
  }
});

export default createController(api)
  .prefix('/user')
  .get('/:id', 'findOneById')
  .post('', 'create')
  .put('/:id', 'update')
  .delete('/:id', 'remove');
