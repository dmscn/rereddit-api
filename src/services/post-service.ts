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

export default class PostService {
  postStore: PostStore | PostMock;

  constructor(postStore: PostStore | PostMock) {
    this.postStore = postStore;
  }

  async find(options?: { offset: number; limit: number }) {
    // @ts-ignore
    return await this.postStore.find(options);
  }

  async findOneById(id: string) {
    assertId(id);
    const post = await this.postStore.findOneById(id);
    return post || NotFound.makeAssert(`Post with id ${id} not found`);
  }

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
