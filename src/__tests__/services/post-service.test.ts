import { throws } from 'assert';
import PostService from '../../services/post-service';
import PostMock, { PostStoreMock } from '../../__mocks__/post.mock';

const mockDatabase: Array<PostMock> = [
  new PostMock({ _id: '1' }),
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
    it('returns all Posts', async () => {
      expect(await service.findAll()).toEqual(postStoreMock.store);
      expect(await postStoreMock.findAll).toBeCalled();
    });
    it('returns Posts with offset and limit', async () => {
      expect(await service.findAll(0, 1)).toEqual([postStoreMock.store[0]]);
      expect(await service.findAll(1, 2)).toEqual([postStoreMock.store[1]]);
      expect(await service.findAll(2, 4)).toEqual([
        postStoreMock.store[2],
        postStoreMock.store[3]
      ]);
      expect(await service.findAll(0)).toEqual(postStoreMock.store);
      expect(await service.findAll(null, 4)).toEqual(postStoreMock.store.slice(0, 4));
      expect(await service.findAll(0, 20)).toEqual(postStoreMock.store);
      expect(await postStoreMock.findAll).toBeCalledTimes(7);
    });
  });

  describe('find', () => {
    beforeAll(() => {
      jest.spyOn(postStoreMock, 'find');
    });
    it('returns BadRequest', async () => {
      // expect((await throws(await service.find(null))).message).toMatch(/No query given/);
    });
    it('returns NotFound', async () => {
      // expect(await throws()).toMatch(/not found/);
    });
    it('find Post(s) by query', async () => {});
  });

  describe('findOneById', () => {
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {
      // expect(await throws()).toMatch(/not found/);
    });
    it('find a Post by id', async () => {});
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
