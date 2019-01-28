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
    this._id = data ? data.id : Math.random().toString(36);
    this.title = data ? data.title : Math.random().toString(10);
    this.content = data ? data.content : Math.random().toString(10);
    this.author = data ? data.author : new UserMock();
    this.date = data ? data.date : new Date();
    this.parent = data ? data.parent : undefined;
    this.replies = data ? data.replies : undefined;
  }
}

export let mockDatabase = [
  new PostMock({ id: '1' }),
  new PostMock({ id: '2' }),
  new PostMock({ id: '3' }),
  new PostMock({ id: '4' }),
  new PostMock({ id: '5' })
];

export class PostStoreMock {
  store: Array<PostMock>;

  constructor(store: Array<PostMock>) {
    this.store = store;
  }

  find = jest.fn(async (offset = 0, limit = 20) => this.store.splice(offset, limit));
  findOneById = jest.fn(async (id: string) => this.store.find(mock => mock._id === id));
  create = jest.fn(async (post: PostMock) => post);
  update = jest.fn(async (post: PostMock) => post);
  reply = jest.fn(async (reply: PostMock) => reply);
  // @ts-ignore
  remove = jest.fn(async (id: string) => null);
}
