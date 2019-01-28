import { throws } from 'smid';
import PostService from '../../services/post-service';
import PostMock, { PostStoreMock, mockDatabase } from '../../__mocks__/post.mock';

const postStoreMock = new PostStoreMock(mockDatabase);
const service = new PostService(postStoreMock);

describe('PostService', () => {
  describe('find', () => {
    it('returns all posts', async () => {
      expect(await service.find()).toEqual(mockDatabase);
    });

    it('returns a post with offset and limit', async () => {
      expect((await service.find(1, 2)).length).toBe(2);
    });
  });

  describe('findOneById', () => {
    it('return not found', async () => {
      expect(await throws(await service.findOneById('nonexistent')).message).toMatch(
        /not found/
      );
    });

    it('should findOneById post by id', async () => {
      expect(await service.findOneById('1')).toEqual(mockDatabase[0]);
      expect(await service.findOneById('2')).toEqual(mockDatabase[1]);
    });
  });

  describe('create', () => {
    // TODO: It should be authorized
    it('should return bad request', async () => {
      expect((await throws(service.create(null))).message).toMatch(/Post inexistent/);
      expect((await throws(service.create(new PostMock({ title: 'baz' })))).message).toMatch(
        /content/
      );
      expect((await throws(service.create(new PostMock()))).message).toMatch(/author/);
      // TODO: Complete expects
    });

    it('should create a new post', async () => {
      const post = new PostMock();
      expect(await service.create(post)).toMatchObject(post);
    });
  });

  describe('update', () => {
    it('should return not found ', async () => {
      // @ts-ignore
      expect((await throws(service.update(null, null))).message).toMatch(/id/);
      // @ts-ignore
      expect((await throws(service.update(null, post))).message).toMatch(/id/);
    });

    it('should return bad request', async () => {
      // @ts-ignore
      expect((await throws(service.update('1'))).message).toMatch(/post/);
    });

    it('should update post', async () => {
      const post = new PostMock();
      expect(await service.update('1', post)).toMatchObject(post);
    });
  });

  describe('remove', () => {
    it('should return not found', async () => {
      // @ts-ignore
      expect((await throws(service.remove())).message).toMatch(/id/);
    });

    it('should remove post', async () => {
      expect(await service.remove('1')).toEqual(undefined);
    });
  });

  describe('reply', () => {
    let reply: any = {};

    it('should return bad request', async () => {
      const post = new PostMock();
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
