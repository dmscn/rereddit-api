// eslint-disable-next-line no-unused-vars
import UserSchema, { User } from '../models/user-model';
import bcrypt from 'bcryptjs';

export default class UserStore {
  logger: any;

  constructor(logger: any) {
    this.logger = logger;
  }

  async find(query?: Object) {
    this.logger.debug(`Looking for users with query: ${query}`);
    return await UserSchema.find(query);
  }

  async findOneById(id: String) {
    this.logger.debug(`Getting user with id ${id}`);
    return await UserSchema.findById(id);
  }

  async create(user: User) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (error) {
      throw new Error(`Could not encrypt password`);
    }
    const newUser = new UserSchema(user);
    this.logger.debug(`Creating user with id ${newUser._id}`);
    return await newUser.save();
  }

  async update(id: String, user: User) {
    this.logger.debug(`Updating user with id ${id}`);
    return await UserSchema.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id: String) {
    this.logger.debug(`Removing user with id ${id}`);
    return await UserSchema.findByIdAndRemove(id);
  }
}
