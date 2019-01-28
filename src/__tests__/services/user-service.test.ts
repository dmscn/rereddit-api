// import PostService from '../../services/post-service';
// import { PostStoreMock, mockDatabase } from '../../__mocks__/post.mock';

describe('PostService', () => {
  describe('login', () => {
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
    it('fails with wrong password', async () => {});
    it('sign user in', async () => {});
  });

  describe('logout', () => {
    it('sign user out', async () => {});
  });

  describe('register', () => {
    it('returns BadRequest', async () => {});
    it('register new user', async () => {});
  });

  describe('find', () => {
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
    it('finds User(s) by query', async () => {});
  });

  describe('findOneById', () => {
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
    it('finds User by id', async () => {});
  });

  describe('update', () => {
    it('is forbidden', async () => {});
    it('returns BadRequest', async () => {});
    it('returns NotFound ', async () => {});
    it('update User', async () => {});
  });

  describe('remove', () => {
    it('is forbidden', () => {});
    it('returns BadRequest', async () => {});
    it('returns NotFound', async () => {});
    it('removes User', async () => {});
  });
});
