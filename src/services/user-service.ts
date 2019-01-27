import { NotFound, BadRequest, Forbidden } from 'fejl';
// eslint-disable-next-line no-unused-vars
import UserStore from '../stores/user-store';
// eslint-disable-next-line no-unused-vars
import { User } from '../models/user-model';
import { validatePassword } from '../helpers/authentication';
// import { decrypt } from '../helpers/authentication';

const assertId = BadRequest.makeAssert('No id given');

export default class UserService {
  userStore: UserStore;

  constructor(userStore: UserStore) {
    this.userStore = userStore;
  }

  async login(email?: string, password?: string) {
    BadRequest.assert(email, 'No email given');
    BadRequest.assert(password, 'No password given');

    try {
      let user = (await this.find({ email }))[0];
      BadRequest.assert(user, `${email} not registered.`);

      // @ts-ignore
      Forbidden.assert(validatePassword(password, user.password), 'Invalid Password');

      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    // TODO: Implement Logout
    return 'Logged Out';
  }

  async register(body: User) {
    const { firstName, lastName, email, password } = body;

    // TODO: Check if email isnnt already user

    BadRequest.assert(firstName, 'No first name given');
    BadRequest.assert(lastName, 'No last name given');
    BadRequest.assert(email, 'No email given');
    BadRequest.assert(password, 'No password given');

    return await this.userStore.create({
      firstName,
      lastName,
      email,
      password
    });
  }

  async find(query?: Object) {
    const user = await this.userStore.find(query);
    NotFound.assert(user, 'User not found');
    return user;
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
