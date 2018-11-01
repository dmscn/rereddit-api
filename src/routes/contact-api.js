import { createController } from 'awilix-koa';

const api = contactService => ({
	getAllContacts: async ctx => ctx.ok(await contactService.getAll(ctx.query)),
	getContactById: async ctx => ctx.ok(await contactService.getContact(ctx.params.id)),
	createContact: async ctx => ctx.created(await contactService.create(ctx.request.body)),
	removeContact: async ctx => ctx.noContent(await contactService.remove(ctx.params.id)),
	updateContact: async ctx =>
		ctx.ok(await contactService.update(ctx.params.id, ctx.request.body))
});

export default createController(api)
	.prefix('/contacts')
	.get('', 'getAllContacts')
	.get('/:id', 'getContactById')
	.post('', 'createContact')
	.put('/:id', 'updateContact')
	.delete('/:id', 'removeContact');
