import { NotFound, BadRequest } from 'fejl';
// eslint-disable-next-line no-unused-vars
import PostStore from '../stores/post-store';
// eslint-disable-next-line no-unused-vars
import { Post } from '../models/post-model';

const assertId = BadRequest.makeAssert('No id given');

export type PostMock = {
  find: (offset: number, limit: number) => void;
  findOneById: (id: string) => void;
  create: (post: Post) => void;
  remove: (id: string) => void;
  update: (id: string, post: Post) => void;
  reply: (post: Post) => void;
};

/**
 * @apiDefine PostGroup Post endpoints
 *
 * Post are tree structured. A root Post has a title and does not have a `parent` attribute.
 * Replies are Post as well and are the chidlren of a root Post.
 * Replies have a `parent` attribute.
 */
export default class PostService {
  postStore: PostStore | PostMock;

  constructor(postStore: PostStore | PostMock) {
    this.postStore = postStore;
  }

  /**
   * @api {GET} /post/:offset/:limit List all the posts.
   * @apiGroup PostGroup
   * @apiParam {Number} offset Specify where the list start.
   * @apiParam {Number} limit Specify where the list ends.
   */
  async find(options?: { offset: number; limit: number }) {
    // @ts-ignore
    return await this.postStore.find(options);
  }

  /**
   * @api {GET} /post/:id Show a single post.
   * @apiGroup PostGroup
   * @apiParam {String} id Id of the post.
   */
  async findOneById(id: string) {
    assertId(id);
    const post = await this.postStore.findOneById(id);
    return post || NotFound.makeAssert(`Post with id ${id} not found`);
  }

  /**
   * @api {POST} /post Creates a new root.
   * @apiGroup PostGroup
   * @apiParam {String} title Title of the post.
   */
  async create(post: Post) {
    BadRequest.assert(post, 'Post inexistent');
    BadRequest.assert(post.title, 'No title');
    BadRequest.assert(post.content, 'No content');
    BadRequest.assert(post.author, 'No author');
    post.date = new Date(); // Sets the current date
    return await this.postStore.create(post);
  }

  async remove(id: string) {
    assertId(id);
    return this.postStore.remove(id);
  }

  async update(id: string, post: Post) {
    assertId(id);
    BadRequest.assert(post, 'No post given');
    return await this.postStore.update(id, post);
  }

  async reply(reply: Post) {
    BadRequest.assert(reply, 'Reply Inexistent');
    BadRequest.assert(reply.parent, 'No post reference specified');
    BadRequest.assert(reply.content, 'No content');
    return await this.postStore.reply(reply);
  }
}
