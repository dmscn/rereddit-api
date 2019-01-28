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
      expect(postStoreMock.findAll).toBeCalledTimes(1);
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
      expect(postStoreMock.findAll).toBeCalledTimes(6);
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
      expect(postStoreMock.find).not.toBeCalled();
    });
    it('returns NotFound', async () => {
      const { message } = await throws(service.find({ content: 'non-existent' }));
      expect(message).toMatch(/found/);
      expect(postStoreMock.find).toBeCalledTimes(1);
    });
    it('find Post(s) by query', async () => {
      expect(await service.find({ content: 'post content' })).toEqual([
        postStoreMock.store[0]
      ]);
      expect(postStoreMock.find).toBeCalledTimes(1);
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
      expect(postStoreMock.findOneById).not.toBeCalled();
    });
    it('returns NotFound', async () => {
      const { message } = await throws(service.findOneById('0'));
      expect(message).toMatch(/found/);
      expect(postStoreMock.findOneById).toBeCalledTimes(1);
    });
    it('find a Post by id', async () => {
      expect(await service.findOneById('1')).toEqual(postStoreMock.store[0]);
      expect(postStoreMock.findOneById).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('is forbidden', () => {});
    it('returns BadRequest', async () => {});
    it('creates a new Post', async () => {});
  });

  describe('update', () => {
    it('is forbidden', async () => {});
    it('returns BadRequest', async () => {});
    it('returns NotFound ', async () => {
      // expect(await throws()).toMatch(/not found/);
    });
    it('update Post', async () => {});
  });

  describe('remove', () => {
    it('is forbidden', () => {});
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {
      // expect(await throws()).toMatch(/not found/);
    });
    it('removes Post', async () => {});
  });

  describe('reply', () => {
    it('is forbidden', async () => {});
    it('returns BadRequest', async () => {});
    it('reply a Post', async () => {});
  });
});
