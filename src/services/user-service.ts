import { NotFound, BadRequest } from 'fejl';
// eslint-disable-next-line no-unused-vars
import UserStore from '../stores/user-store';
// eslint-disable-next-line no-unused-vars
import { User } from '../models/user-model';
import { hash } from '../helpers/authentication';

const assertId = BadRequest.makeAssert('No id given');

export default class UserService {
  userStore: UserStore;

  constructor(userStore: UserStore) {
    this.userStore = userStore;
  }

  async login(email: string, password: string) {
    return `${email} ${hash(password)}`;
  }

  async logout(id: string) {
    return `${id}`;
  }

  async register(user: User) {
    BadRequest.assert(user, 'User inexistent');
    BadRequest.assert(user.firstName, 'No first name given');
    BadRequest.assert(user.lastName, 'No last name given');
    BadRequest.assert(user.email, 'No email given');
    BadRequest.assert(user.password, 'No password given');
    user.date = new Date(); // Sets the current date
    return await this.userStore.create(user);
  }

  async find(query?: Object) {
    return await this.userStore.find(await query);
  }

  async findOneById(id: string) {
    assertId(id);
    const user = await this.userStore.findOneById(id);
    return user || NotFound.makeAssert(`User with id ${id} not found`);
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
