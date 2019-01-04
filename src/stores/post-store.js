import Post from '../models/post-model';

export default function createContactStore(logger) {
	return {
		async getAll() {
			logger.debug('Getting all posts');
			return Post.find();
		},
		async get(id) {
			logger.debug(`Getting post with id ${id}`);
			return Post.findById(id);
		},
		async create(post) {
			logger.debug(`Creating post with id ${post.id}`);
			return await new Post(post).save();
		},
		async update(id, post) {
			logger.debug(`Updating post with id ${id}`);
			return await Post.findByIdAndUpdate(id, post);
		},
		async remove(id) {
			logger.debug(`Removing post with id ${id}`);
			return Post.findByIdAndRemove(id);
		}
	};
}
