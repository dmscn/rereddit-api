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
 * @class PostService
 * @argument store
 *
 * Post are tree structured. A root Post has a title and does not have a `parent` attribute
 * Replies are Post as well and are the chidlren of a root Post
 * Replies have a `parent` attribute
 */
export default class PostService {
  postStore: PostStore | PostMock;

  constructor(postStore: PostStore | PostMock) {
    this.postStore = postStore;
  }

  /**
   * @param {Number} [offset] Specify where the list start
   * @param {Number} [limit] Specify where the list ends
   * @returns {Promise<any>} List with all the Posts
   */
  async find(options?: { offset: number; limit: number }): Promise<any> {
    // @ts-ignore
    return await this.postStore.find(options);
  }

  /**
   * @param {String} id Id of the post
   * @returns {Promise<any>} The Post found
   */
  async findOneById(id: string): Promise<any> {
    assertId(id);
    const post = await this.postStore.findOneById(id);
    return post || NotFound.makeAssert(`Post with id ${id} not found`);
  }

  /**
   * @param {Post} post The Post that will be created
   * @returns {Promise<any>} Created Post
   */
  async create(post: Post): Promise<any> {
    BadRequest.assert(post, 'Post inexistent');
    BadRequest.assert(post.title, 'No title');
    BadRequest.assert(post.content, 'No content');
    BadRequest.assert(post.author, 'No author');
    post.date = new Date(); // Sets the current date
    return await this.postStore.create(post);
  }

  /**
   * @param {String} id Id of the Post that will be removed
   * @returns {Promise<any>} Empty Post
   */
  async remove(id: string): Promise<any> {
    assertId(id);
    return this.postStore.remove(id);
  }

  /**
   * @param {Post} post The Post that will be updated
   * @returns {Promise<any>} Updated Post
   */
  async update(id: string, post: Post): Promise<any> {
    assertId(id);
    BadRequest.assert(post, 'No post given');
    return await this.postStore.update(id, post);
  }

  /**
   * @param {Post} post The reply Post containing the parent that will be replied
   * @returns {Promise<any>} The parent Post with it's replies
   */
  async reply(reply: Post): Promise<any> {
    BadRequest.assert(reply, 'Reply Inexistent');
    BadRequest.assert(reply.parent, 'No post reference specified');
    BadRequest.assert(reply.content, 'No content');
    return await this.postStore.reply(reply);
  }
}
