// eslint-disable-next-line no-unused-vars
import PostSchema from '../models/post-model';

export default class PostStore {
  logger: any;

  constructor(logger: any) {
    this.logger = logger;
  }

  async findAll(offset?: number, limit?: number) {
    this.logger.debug('Getting all the posts');
    return await PostSchema.find({ parent: null })
      .skip(offset || 0)
      .limit(limit || 20)
      .sort({
        date: 'asc'
      });
  }

  async find(query: Object) {
    this.logger.debug(`Getting Post that satisfies: ${query}`);
    return await PostSchema.find(query);
  }

  async findOneById(id: string) {
    this.logger.debug(`Getting post with id ${id}`);
    return await PostSchema.findById(id);
  }

  async create(data: any) {
    const newPost = new PostSchema(data);
    this.logger.debug(`Creating post with id ${newPost._id}`);
    return await newPost.save();
  }

  async update(id: string, data: any) {
    this.logger.debug(`Updating post with id ${id}`);
    return await PostSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    this.logger.debug(`Removing post with id ${id}`);
    return PostSchema.findByIdAndRemove(id);
  }

  async reply(reply: any) {
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
      return await parentPost.save();
    } catch (error) {
      throw error;
    }
  }
}
