import { throws } from 'smid';
import PostService from '../../services/post-service';
import PostMock, { PostStoreMock } from '../../__mocks__/post.mock';

const mockDatabase: Array<PostMock> = [
  new PostMock({ _id: '1', content: 'post content' }),
  new PostMock({ _id: '2' }),
  new PostMock({ _id: '3' }),
  new PostMock({ _id: '4' }),
  new PostMock({ _id: '5' })
];
const postStoreMock = new PostStoreMock(mockDatabase);
const service = new PostService(postStoreMock);

describe('PostService', () => {
  describe('findAll', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'findAll');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'findAll').mockClear();
    });
    it('returns all Posts', async () => {
      expect(await service.findAll()).toEqual(postStoreMock.store);
      expect(postStoreMock.findAll).toHaveBeenCalledTimes(1);
    });
    it('returns Posts with offset and limit', async () => {
      expect(await service.findAll(0, 1)).toEqual([postStoreMock.store[0]]);
      expect(await service.findAll(1, 2)).toEqual([postStoreMock.store[1]]);
      expect(await service.findAll(2, 4)).toEqual([
        postStoreMock.store[2],
        postStoreMock.store[3]
      ]);
      expect(await service.findAll(0)).toEqual(postStoreMock.store);
      expect(await service.findAll(undefined, 4)).toEqual(postStoreMock.store.slice(0, 4));
      expect(await service.findAll(0, 20)).toEqual(postStoreMock.store);
      expect(postStoreMock.findAll).toHaveBeenCalledTimes(6);
    });
  });

  describe('find', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'find');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'find').mockClear();
    });
    it('returns BadRequest', async () => {
      let { message } = await throws(service.find(undefined));
      expect(message).toMatch(/No query given/);
      expect(postStoreMock.find).not.toHaveBeenCalled();
    });
    it('returns NotFound', async () => {
      const { message } = await throws(service.find({ content: 'non-existent' }));
      expect(message).toMatch(/found/);
      expect(postStoreMock.find).toHaveBeenCalledTimes(1);
    });
    it('find Post(s) by query', async () => {
      expect(await service.find({ content: 'post content' })).toEqual([
        postStoreMock.store[0]
      ]);
      expect(postStoreMock.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'findOneById');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'findOneById').mockClear();
    });
    it('returns BadRequest', async () => {
      const { message } = await throws(service.findOneById(undefined));
      expect(message).toMatch(/No id given/);
      expect(postStoreMock.findOneById).not.toHaveBeenCalled();
    });
    it('returns NotFound', async () => {
      const { message } = await throws(service.findOneById('0'));
      expect(message).toMatch(/found/);
      expect(postStoreMock.findOneById).toHaveBeenCalledTimes(1);
    });
    it('find a Post by id', async () => {
      expect(await service.findOneById('1')).toEqual(postStoreMock.store[0]);
      expect(postStoreMock.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'create');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'create').mockClear();
    });
    it('returns BadRequest', async () => {
      const postMock = new PostMock();

      postMock.title = undefined;
      let error = await throws(service.create(postMock));
      expect(error.message).toMatch(/No title given/);

      postMock.title = 'title';
      postMock.content = undefined;
      error = await throws(service.create(postMock));
      expect(error.message).toMatch(/No content given/);

      postMock.content = 'content';
      postMock.author = undefined;
      error = await throws(service.create(postMock));
      expect(error.message).toMatch(/No author given/);

      expect(postStoreMock.create).not.toHaveBeenCalled();
    });
    it('creates a new Post', async () => {
      const postMock = new PostMock();
      expect(await service.create(postMock)).toEqual(postMock);
      expect(postStoreMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'update');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'update').mockClear();
    });
    it('returns BadRequest', async () => {
      let error = await throws(service.update(undefined, { content: 'content' }));
      expect(error.message).toMatch(/No id given/);

      error = await throws(service.update('1', undefined));
      expect(error.message).toMatch(/No Post data given/);

      expect(postStoreMock.update).not.toHaveBeenCalled();
    });
    it('returns NotFound ', async () => {
      const { message } = await throws(service.update('0', { content: 'content' }));
      expect(message).toMatch(/found/);
      expect(postStoreMock.update).toHaveBeenCalledTimes(1);
    });
    it('update Post', async () => {
      expect(await service.update('1', { content: 'changed' })).toEqual({
        content: 'changed'
      });
      expect(postStoreMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'remove');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'remove').mockClear();
    });
    it('returns BadRequest', async () => {
      const { message } = await throws(service.remove(undefined));
      expect(message).toMatch(/No id given/);
      expect(postStoreMock.remove).not.toHaveBeenCalled();
    });
    it('removes Post', async () => {
      expect(await service.remove('5')).toEqual({});
      expect(postStoreMock.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe('reply', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'reply');
    });

    beforeEach(() => {
      jest.spyOn(postStoreMock, 'reply').mockClear();
    });
    it('returns BadRequest', async () => {
      let error = await throws(service.reply({ content: 'content' }));
      expect(error.message).toMatch(/No parent post reference given/);

      error = await throws(service.reply({ parent: '1' }));
      expect(error.message).toMatch(/No content given/);

      expect(postStoreMock.reply).not.toHaveBeenCalled();
    });
    it('reply a Post', async () => {
      let postMock = new PostMock();
      postMock.parent = '1';
      postMock.content = 'reply content';
      expect(await service.reply(postMock)).toEqual(postMock);

      expect(postStoreMock.reply).toHaveBeenCalledTimes(1);
    });
  });
});
