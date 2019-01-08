import User from '../models/user-model';

export default function createUserStore(logger) {
	return {
		async find() {
			logger.debug('Getting all users');
			return await User.find();
		},
		async findOneById(id) {
			logger.debug(`Getting user with id ${id}`);
			return await User.findById(id);
		},
		async create(user) {
			logger.debug(`Creating user with id ${user.id}`);
			return await new User(user).save();
		},
		async update(id, user) {
			logger.debug(`Updating user with id ${id}`);
			return await User.findByIdAndUpdate(id, user, { new: true });
		},
		async remove(id) {
			logger.debug(`Removing user with id ${id}`);
			return User.findByIdAndRemove(id);
		}
	};
}
