import { NotFound, BadRequest } from 'fejl';

const assertId = BadRequest.makeAssert('No id given');

export default class UserService {
  constructor(userStore) {
    this.userStore = userStore;
  }

  async find() {
    return await this.userStore.find();
  }

  async findOneById(id) {
    assertId(id);
    const user = await this.userStore.findOneById(id);
    return user || NotFound.makeAssert(`User with id ${id} not found`);
  }

  async create(user) {
    BadRequest.assert(user, 'User inexistent');
    BadRequest.assert(user.name, 'No title');
    BadRequest.assert(user.email, 'No content');
    BadRequest.assert(user.points, 'No author');
    BadRequest.assert(user.avatar, 'No avatar');
    user.date = new Date(); // Sets the current date
    return await this.userStore.create(user);
  }

  async remove(id) {
    assertId(id);
    return this.userStore.remove(id);
  }

  async update(id, user) {
    assertId(id);
    BadRequest.assert(user, 'No user given');
    return await this.userStore.update(id, user);
  }
}
