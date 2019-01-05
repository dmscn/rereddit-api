import { throws } from 'smid';
import PostService from '../../services/post-service';

class User {
	constructor(email) {
		this.email = email;
	}
}

const post = {
	_id: 5,
	title: 'Baz',
	content: 'Baz',
	author: new User('Baz@email.com'),
	date: new Date(),
	parentPost: null
};

describe('PostService', () => {
	describe('find', () => {
		it('should findOneById all posts', async () => {
			const { service, posts } = setup();
			expect(await service.find()).toEqual(posts);
		});
	});

	describe('findOneById', () => {
		it('should return not found', async () => {
			const { service } = setup();
			expect(await throws(await service.findOneById('nonexistent')).message).toMatch(
				/not found/
			);
		});

		it('should findOneById post by id', async () => {
			const { service, posts } = setup();
			expect(await service.findOneById(1)).toEqual(posts[0]);
			expect(await service.findOneById(2)).toEqual(posts[1]);
		});
	});

	describe('create', () => {
		it('should return bad request', async () => {
			const { service } = setup();
			expect((await throws(service.create())).message).toMatch(/Post inexistent/);
			expect((await throws(service.create({ title: 'baz' }))).message).toMatch(/content/);
			expect(
				(await throws(service.create({ title: 'baz', content: 'baz@email.com' }))).message
			).toMatch(/author/);
			// TODO: Complete expects
		});

		it('should create a new post', async () => {
			const { service } = setup();
			expect(await service.create(post)).toMatchObject(post);
		});
	});

	describe('update', () => {
		it('should return not found ', async () => {
			const { service } = setup();
			expect((await throws(service.update())).message).toMatch(/id/);
			expect((await throws(service.update(null, post))).message).toMatch(/id/);
		});

		it('should return bad request', async () => {
			const { service } = setup();
			expect((await throws(service.update(1))).message).toMatch(/post/);
		});

		it('should update post', async () => {
			const { service } = setup();
			expect(await service.update(1, post)).toMatchObject(post);
		});
	});

	describe('remove', () => {
		it('should return not found', async () => {
			const { service } = setup();
			expect((await throws(service.remove())).message).toMatch(/id/);
		});

		it('should remove post', async () => {
			const { service } = setup();
			expect(await service.remove(1)).toEqual(undefined);
		});
	});

	describe('reply', () => {
		let reply = {};

		it('should return bad request', async () => {
			const { service } = setup();
			expect((await throws(service.reply(reply))).message).toMatch(/post/);

			reply.title = 'Foo';
			expect((await throws(service.reply(reply))).message).toMatch(/reference/);

			reply.parentPost = post._id;
			expect((await throws(service.reply(reply))).message).toMatch(/content/);
		});

		it('should reply a post', async () => {
			const { service } = setup();
			expect(
				await service.reply({
					content: 'Foo',
					parentPost: post._id
				})
			);

			try {
				const { replies } = await service.findOneById(post._id);
				expect(replies).toContain(reply);
			} catch (error) {
				return false;
			}
		});
	});
});

function setup() {
	const posts = [
		{
			id: 1,
			title: 'Foo',
			content: '999999999',
			author: new User('foo@email.com'),
			date: new Date()
		},
		{
			id: 2,
			title: 'Bar',
			content: '888888888',
			author: new User('bar@email.com'),
			date: new Date()
		}
	];

	/* eslint-disable */
  const store = {
    find: jest.fn(async () => [...posts]),
    findOneById: jest.fn(async id => posts.find(post => post.id === id)),
    create: jest.fn(async post => ({ ...post, id: 3 })),
    update: jest.fn(async (id, data) => ({ ...post, ...data })),
    remove: jest.fn(async id => undefined)
  };
  /* eslint-enable */
	return { service: new PostService(store), store, posts };
}
