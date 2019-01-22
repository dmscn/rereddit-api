import PostSchema, { Post } from '../models/post-model';

export type PostStore = {
  createPostStore: Function;
};

export function createPostStore(logger: any) {
  return {
    async find(offset = 0, limit = 20) {
      logger.debug('Getting all the posts');
      return await PostSchema.find({ parent: null })
        .skip(offset)
        .limit(limit)
        .sort({
          date: 'asc'
        });
    },
    async findOneById(id: string) {
      logger.debug(`Getting post with id ${id}`);
      return await PostSchema.findById(id);
    },
    async create(post: Post) {
      logger.debug(`Creating post with id ${post.id}`);
      return await new PostSchema(post).save();
    },
    async update(id: String, post: Post) {
      logger.debug(`Updating post with id ${id}`);
      return await PostSchema.findByIdAndUpdate(id, post, { new: true });
    },
    async remove(id: String) {
      logger.debug(`Removing post with id ${id}`);
      return PostSchema.findByIdAndRemove(id);
    },
    async reply(reply: Post) {
      logger.debug(`Replying post with id ${reply.parent}`);
      try {
        logger.debug(`Replying ${reply.parent} with \n ${JSON.stringify(reply, null, 2)} \n`);
        let parentPost = await PostSchema.findById(reply.parent);
        const replyPost = new PostSchema(reply);
        try {
          await replyPost.save();
          parentPost.replies.push(replyPost);
        } catch (err) {
          return new Error("Couldn't create reply");
        }
        return parentPost.save();
      } catch (error) {
        throw error;
      }
    }
  };
}
