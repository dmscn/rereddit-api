import Post from '../models/post-model';

export default function createPostStore(logger) {
  return {
    async find(offset = 0, limit = 20) {
      logger.debug('Getting all the posts');
      return await Post.find({ parent: null })
        .skip(offset)
        .limit(limit);
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
        logger.debug(`Replying ${reply.parent} with \n ${JSON.stringify(reply, null, 2)} \n`);
        let parentPost = await Post.findById(reply.parent);
        const replyPost = new Post(reply);
        try {
          await replyPost.save();
          parentPost.replies.push(replyPost);
        } catch (err) {
          return new Error("Couldn't create reply", err);
        }
        return parentPost.save();
      } catch (error) {
        throw error;
      }
    }
  };
}
