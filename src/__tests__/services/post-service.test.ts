// import PostService from '../../services/post-service';
// import { PostStoreMock, mockDatabase } from '../../__mocks__/post.mock';

// const postStoreMock = new PostStoreMock(mockDatabase);
// const service = new PostService(postStoreMock);

describe('PostService', () => {
  describe('findAll', () => {
    it('returns NotFound', async () => {});
    it('returns all Posts', async () => {});
    it('returns Posts with offset and limit', async () => {});
    it('returns Posts based on query', async () => {});
  });

  describe('find', () => {
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
    it('find Post(s) by query', async () => {});
  });

  describe('findOneById', () => {
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
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
    it('returns NotFound ', async () => {});
    it('update Post', async () => {});
  });

  describe('remove', () => {
    it('is forbidden', () => {});
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
    it('removes Post', async () => {});
  });

  describe('reply', () => {
    it('is forbidden', async () => {});
    it('returns BadRequest', async () => {});
    it('reply a Post', async () => {});
  });
});
