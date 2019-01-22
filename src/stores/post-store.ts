// eslint-disable-next-line no-unused-vars
import PostSchema, { Post } from '../models/post-model';

export default class PostStore {
  logger: any;

  constructor(logger: any) {
    this.logger = logger;
  }

  async find(options = { offset: 0, limit: 20 }) {
    this.logger.debug('Getting all the posts');
    return await PostSchema.find({ parent: null })
      .skip(options.offset)
      .limit(options.limit)
      .sort({
        date: 'asc'
      });
  }

  async findOneById(id: string) {
    this.logger.debug(`Getting post with id ${id}`);
    return await PostSchema.findById(id);
  }

  async create(post: Post) {
    this.logger.debug(`Creating post with id ${post._id}`);
    return await new PostSchema(post).save();
  }

  async update(id: String, post: Post) {
    this.logger.debug(`Updating post with id ${id}`);
    return await PostSchema.findByIdAndUpdate(id, post, { new: true });
  }

  async remove(id: String) {
    this.logger.debug(`Removing post with id ${id}`);
    return PostSchema.findByIdAndRemove(id);
  }

  async reply(reply: Post) {
    this.logger.debug(`Replying post with id ${reply.parent}`);
    try {
      this.logger.debug(
        `Replying ${reply.parent} with \n ${JSON.stringify(reply, null, 2)} \n`
      );
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
}
