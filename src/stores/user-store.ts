import UserSchema, { User } from '../models/user-model';

export type UserStore = {
  createUserStore: Function;
};

export default function createUserStore(logger: any) {
  return {
    async find() {
      logger.debug('Getting all users');
      return await UserSchema.find();
    },
    async findOneById(id: String) {
      logger.debug(`Getting user with id ${id}`);
      return await UserSchema.findById(id);
    },
    async create(user: User) {
      logger.debug(`Creating user with id ${user.id}`);
      return await new UserSchema(user).save();
    },
    async update(id: String, user: User) {
      logger.debug(`Updating user with id ${id}`);
      return await UserSchema.findByIdAndUpdate(id, user, { new: true });
    },
    async remove(id: String) {
      logger.debug(`Removing user with id ${id}`);
      return UserSchema.findByIdAndRemove(id);
    }
  };
}
