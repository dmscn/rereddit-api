import Post from '../models/post-model';

export default function createPostStore(logger) {
  return {
    async find() {
      logger.debug('Getting all posts');
      return await Post.find();
    },
    async findOneById(id) {
      logger.debug(`Getting post with id ${id}`);
      return await Post.findById(id);
    },
    async create(post) {
      logger.debug(`Creating post with id ${post.id}`);
      return await new Post(post).save();
    },
    async update(id, post) {
      logger.debug(`Updating post with id ${id}`);
      return await Post.findByIdAndUpdate(id, post, { new: true });
    },
    async remove(id) {
      logger.debug(`Removing post with id ${id}`);
      return Post.findByIdAndRemove(id);
    },
    async reply(reply) {
      logger.debug(`Replying post with id ${reply.parent}`);
      try {
        logger.debug(`Replying ${reply.parent} with ${JSON.stringify(reply, null, 2)}`);
        let parentPost = await Post.findById(reply.parent);
        parentPost._doc.replies.push(
          new Post({
            ...reply,
            parent: parentPost._doc._id
          })
        );
        return parentPost.save();
      } catch (error) {
        throw error;
      }
    }
  };
}
