import { NotFound, BadRequest } from 'fejl';

const assertId = BadRequest.makeAssert('No id given');

export default class PostService {
	constructor(postStore) {
		this.postStore = postStore;
	}

	async find() {
		return await this.postStore.find();
	}

	async findOneById(id) {
		assertId(id);
		const post = await this.postStore.findOneById(id);
		return post || NotFound.makeAssert(`Post with id ${id} not found`);
	}

	async create(post) {
		BadRequest.assert(post, 'Post inexistent');
		BadRequest.assert(post.title, 'No title');
		BadRequest.assert(post.content, 'No content');
		BadRequest.assert(post.author, 'No author');
		post.date = new Date(); // Sets the current date
		return await this.postStore.create(post);
	}

	async remove(id) {
		assertId(id);
		return this.postStore.remove(id);
	}

	async update(id, post) {
		assertId(id);
		BadRequest.assert(post, 'No post given');
		return await this.postStore.update(id, post);
	}

	async reply(reply) {
		BadRequest.assert(reply, 'Reply Inexistent');
		BadRequest.assert(reply.parentPost, 'No post reference specified');
		BadRequest.assert(reply.content, 'No content');
		return await this.postStore.reply(reply);
	}
}
