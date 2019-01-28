import { NotFound, BadRequest } from 'fejl';
// eslint-disable-next-line no-unused-vars
import PostStore from '../stores/post-store';
// eslint-disable-next-line no-unused-vars
import { PostStoreMock } from '../__mocks__/post.mock';

const assertId = BadRequest.makeAssert('No id given');

/**
 * @class PostService
 * @argument store
 *
 * Post are tree structured. A root Post has a title and does not have a `parent` attribute
 * Replies are Post as well and are the chidlren of a root Post
 * Replies have a `parent` attribute
 */
export default class PostService {
  postStore: PostStore | PostStoreMock;

  constructor(postStore: PostStore | PostStoreMock) {
    this.postStore = postStore;
  }

  /**
   * @param {Number} [offset] Specify where the list start
   * @param {Number} [limit] Specify where the list ends
   * @returns {Promise<any>} List with all the Posts
   */
  async findAll(offset?: number, limit?: number): Promise<any> {
    // @ts-ignore
    return await this.postStore.findAll(offset, limit);
  }

  /**
   * @param {Object} query Query to get a specific Post
   * @returns {Promise<any>} List with all the Posts
   */
  async find(data: any): Promise<any> {
    BadRequest.assert(data, 'No query given');

    let posts = await this.postStore.find(data);
    if (posts.length === 0) posts = null;
    NotFound.assert(posts, `No Posts found with query ${data}`);

    return posts;
  }

  /**
   * @param {String} id Id of the post
   * @returns {Promise<any>} The Post found
   */
  async findOneById(id: string): Promise<any> {
    assertId(id);

    let post = await this.postStore.findOneById(id);
    NotFound.assert(post || null, `No Post found with id ${id}`);

    return post;
  }

  /**
   * @param {Post} post The Post that will be created
   * @returns {Promise<any>} Created Post
   */
  async create(data: any): Promise<any> {
    BadRequest.assert(data.title, 'No title given');
    BadRequest.assert(data.content, 'No content given');
    BadRequest.assert(data.author, 'No author given');

    const post = await this.postStore.create(data);
    return post;
  }

  /**
   * @param {Post} post The Post that will be updated
   * @returns {Promise<any>} Updated Post
   */
  async update(id: string, data: any): Promise<any> {
    assertId(id);
    BadRequest.assert(data, 'No Post data given');

    const post = await this.postStore.update(id, data);
    NotFound.assert(post, `No post found with id ${id}`);

    return post;
  }

  /**
   * @param {Post} post The reply Post containing the parent that will be replied
   * @returns {Promise<any>} The parent Post with it's replies
   */
  async reply(data: any): Promise<any> {
    BadRequest.assert(data, 'Reply Inexistent');
    BadRequest.assert(data.parent, 'No post reference specified');
    BadRequest.assert(data.content, 'No content');

    const post = await this.postStore.reply(data);
    NotFound.assert(post, `No parent Post found with id ${data.parent}`);

    return post;
  }

  /**
   * @param {String} id Id of the Post that will be removed
   * @returns {Promise<any>} Empty Post
   */
  async remove(id: string): Promise<any> {
    assertId(id);
    return this.postStore.remove(id);
  }
}
