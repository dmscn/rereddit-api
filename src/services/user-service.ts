import { NotFound, BadRequest } from 'fejl';
// eslint-disable-next-line no-unused-vars
import UserStore from '../stores/user-store';
// eslint-disable-next-line no-unused-vars
import { User } from '../models/user-model';

const assertId = BadRequest.makeAssert('No id given');

export default class UserService {
  userStore: UserStore;

  constructor(userStore: UserStore) {
    this.userStore = userStore;
  }

  async find() {
    return await this.userStore.find();
  }

  async findOneById(id: string) {
    assertId(id);
    const user = await this.userStore.findOneById(id);
    return user || NotFound.makeAssert(`User with id ${id} not found`);
  }

  async create(user: User) {
    BadRequest.assert(user, 'User inexistent');
    BadRequest.assert(user.name, 'No title');
    BadRequest.assert(user.email, 'No content');
    BadRequest.assert(user.points, 'No author');
    BadRequest.assert(user.avatar, 'No avatar');
    user.date = new Date(); // Sets the current date
    return await this.userStore.create(user);
  }

  async remove(id: string) {
    assertId(id);
    return this.userStore.remove(id);
  }

  async update(id: string, user: User) {
    assertId(id);
    BadRequest.assert(user, 'No user given');
    return await this.userStore.update(id, user);
  }
}
