import { throws } from 'smid';
import PostService, { PostMock } from '../../services/post-service';
import { Post } from '../../models/post-model';

class User {
  _id = '1';
  email = 'email@email.com';
  firstName = 'John';
  lastName = 'Wicker';
  password = '123456';

  constructor(email: string) {
    this.email = email;
  }
}

const post: Post = {
  _id: '5',
  title: 'Baz',
  content: 'Baz',
  author: new User('teste@teste.com'),
  date: new Date()
};

describe('PostService', () => {
  describe('find', () => {
    it('should findOneById all posts', async () => {
      const { service, posts } = setup();
      expect(await service.find()).toEqual(posts);
    });
  });

  describe('findOneById', () => {
    it('should return not found', async () => {
      const { service } = setup();
      expect(await throws(await service.findOneById('nonexistent')).message).toMatch(
        /not found/
      );
    });

    it('should findOneById post by id', async () => {
      const { service, posts } = setup();
      expect(await service.findOneById('1')).toEqual(posts[0]);
      expect(await service.findOneById('2')).toEqual(posts[1]);
    });
  });

  describe('create', () => {
    it('should return bad request', async () => {
      const { service } = setup();
      // @ts-ignore
      expect((await throws(service.create(null))).message).toMatch(/Post inexistent/);
      // @ts-ignore
      expect((await throws(service.create({ title: 'baz' }))).message).toMatch(/content/);
      expect(
        // @ts-ignore
        (await throws(service.create({ title: 'baz', content: 'baz@email.com' }))).message
      ).toMatch(/author/);
      // TODO: Complete expects
    });

    it('should create a new post', async () => {
      const { service } = setup();
      expect(await service.create(post)).toMatchObject(post);
    });
  });

  describe('update', () => {
    it('should return not found ', async () => {
      const { service } = setup();
      // @ts-ignore
      expect((await throws(service.update(null, null))).message).toMatch(/id/);
      // @ts-ignore
      expect((await throws(service.update(null, post))).message).toMatch(/id/);
    });

    it('should return bad request', async () => {
      const { service } = setup();
      // @ts-ignore
      expect((await throws(service.update('1'))).message).toMatch(/post/);
    });

    it('should update post', async () => {
      const { service } = setup();
      expect(await service.update('1', post)).toMatchObject(post);
    });
  });

  describe('remove', () => {
    it('should return not found', async () => {
      const { service } = setup();
      // @ts-ignore
      expect((await throws(service.remove())).message).toMatch(/id/);
    });

    it('should remove post', async () => {
      const { service } = setup();
      expect(await service.remove('1')).toEqual(undefined);
    });
  });

  describe('reply', () => {
    let reply: any = {};

    it('should return bad request', async () => {
      const { service } = setup();
      expect((await throws(service.reply(reply))).message).toMatch(/post/);

      reply.title = 'Foo';
      expect((await throws(service.reply(reply))).message).toMatch(/reference/);

      reply.parent = post._id;
      expect((await throws(service.reply(reply))).message).toMatch(/content/);
    });

    // it('should reply a post', async () => {
    //   const { service, store } = setup();
    //   const reply = await service.reply({
    //     content: 'Foo',
    //     parent: post._id
    //   });

    //   expect(store.reply).toHaveBeenCalled();

    //   try {
    //     const { replies } = await service.findOneById(post._id);
    //     expect(replies).toContain(reply);
    //   } catch (error) {
    //     return false;
    //   }
    // });
  });
});

function setup() {
  const posts = [
    {
      id: '1',
      title: 'Foo',
      content: '999999999',
      author: new User('foo@email.com'),
      date: new Date()
    },
    {
      id: '2',
      title: 'Bar',
      content: '888888888',
      author: new User('bar@email.com'),
      date: new Date()
    }
  ];

  /* eslint-disable */
  const store: PostMock = {
    // @ts-ignore
    find: jest.fn(async (offset?: number, limit?: number) => [...posts]),
    findOneById: jest.fn(async (id: string) => posts.find(post => post.id === id)),
    create: jest.fn(async (post: Post) => ({ ...post, id: 3 })),
    update: jest.fn(async (data: any) => ({ ...post, ...data })),
    // @ts-ignore
    remove: jest.fn(async (id: string) => undefined),
    reply: jest.fn(async reply => reply)
  };
  /* eslint-enable */
  return { service: new PostService(store), store, posts };
}
