// eslint-disable-next-line no-unused-vars
import UserSchema, { User } from '../models/user-model';

export default class UserStore {
  logger: any;

  constructor(logger: any) {
    this.logger = logger;
  }

  async find() {
    this.logger.debug('Getting all users');
    return await UserSchema.find();
  }

  async findOneById(id: String) {
    this.logger.debug(`Getting user with id ${id}`);
    return await UserSchema.findById(id);
  }

  async create(user: User) {
    this.logger.debug(`Creating user with id ${user.id}`);
    return await new UserSchema(user).save();
  }

  async update(id: String, user: User) {
    this.logger.debug(`Updating user with id ${id}`);
    return await UserSchema.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id: String) {
    this.logger.debug(`Removing user with id ${id}`);
    return UserSchema.findByIdAndRemove(id);
  }
}
