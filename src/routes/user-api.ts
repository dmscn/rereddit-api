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
   * @api {POST} /login Sign in user
   * @apiGroup AuthGroup
   * @apiParam {String} email Email
   * @apiParam {String} Password Password
   */
  login: async (ctx: Context) => {},

  /**
   * @api {GET} /logout
   * @apiGroup AuthGroup
   */
  logout: async (ctx: Context) => {},

  /**
   * @api {POST} /user Create
   * @apiGroup UserGroup
   * @apiParam {String} nome First Name
   * @apiParam {String} email Email
   * @apiParam {String} [avatar] Image Base64 or URL
   * @apiParam {Number} [points] Points
   */
  register: async (ctx: Context) => {
    return ctx.created(await userService.create(ctx.request.body));
  },

  /**
   * @api {GET} /user/ Get Users
   * @apiGroup UserGroup
   * @apiParam {String} [query] Query to find the users
   */
  find: async (ctx: Context) => {
    return ctx.ok(await userService.find(JSON.parse(ctx.request.body.query)));
  },

  /**
   * @api {GET} /user/:id Get Single
   * @apiGroup UserGroup
   * @apiParam {String} id Id of the post to be found
   */
  findOneById: async (ctx: Context) => {
    return ctx.ok(await userService.findOneById(ctx.params.id));
  },

  /**
   * @api {PUT} /user Update
   * @apiGroup UserGroup
   * @apiParam {String} [name] First Name
   * @apiParam {String} [email] Email
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
  .post('/login', 'login')
  .post('/register', 'register')
  .get('/logout', 'logout')
  .get('', 'find')
  .get('/:id', 'findOneById')
  .put('/:id', 'update')
  .delete('/:id', 'remove');
