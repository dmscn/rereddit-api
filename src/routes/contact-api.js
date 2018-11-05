import { createController } from 'awilix-koa';

const api = contactService => ({
	getAll: async ctx => ctx.ok(await contactService.getAll(ctx.query)),
	get: async ctx => ctx.ok(await contactService.get(ctx.params.id)),
	create: async ctx => ctx.created(await contactService.create(ctx.request.body)),
	remove: async ctx => ctx.noContent(await contactService.remove(ctx.params.id)),
	update: async ctx => ctx.ok(await contactService.update(ctx.params.id, ctx.request.body))
});

export default createController(api)
	.prefix('/contacts')
	.get('', 'getAll')
	.get('/:id', 'get')
	.post('', 'create')
	.put('/:id', 'update')
	.delete('/:id', 'remove');
