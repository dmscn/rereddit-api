import UserMock from './user.mock';

export default class PostMock {
  _id?: string;
  title?: string;
  content?: string;
  author?: UserMock;
  date?: Date;
  parent?: PostMock;
  replies?: [PostMock];

  constructor(data?: {
    _id?: string;
    title?: string;
    content?: string;
    author?: UserMock;
    date?: Date;
    parent?: PostMock;
    replies?: [PostMock];
  }) {
    this._id = data
      ? data._id
      : Math.random()
          .toString(36)
          .substring(7);
    this.title = data
      ? data.title
      : Math.random()
          .toString(36)
          .substring(7);
    this.content = data
      ? data.content
      : Math.random()
          .toString(36)
          .substring(7);
    this.author = data ? data.author : new UserMock();
    this.date = data ? data.date : new Date();
    this.parent = data ? data.parent : undefined;
    this.replies = data ? data.replies : undefined;
  }
}

export class PostStoreMock {
  store: Array<PostMock>;

  constructor(store: Array<PostMock>) {
    this.store = store;
  }

  async findAll(offset?: number, limit?: number) {
    return this.store.slice(offset || 0, limit || 20);
  }

  async find(query: any) {
    return this.store.filter(mock => mock.content === query.content);
  }

  async findOneById(id: string) {
    return this.store.find(mock => mock._id === id);
  }

  async create(post: PostMock) {
    return post;
  }

  // @ts-ignore
  async update(id: string, post: PostMock) {
    return post;
  }

  async reply(reply: PostMock) {
    return reply;
  }

  // @ts-ignore
  async remove(id: string) {
    return null;
  }
}
