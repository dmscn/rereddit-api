import { createController } from 'awilix-koa';

const resolvers = contactService => ({
	Query: {
		async getContacts() {
			return await contactService.getAll();
		},
		async getContact(id) {
			return await contactService.get(id);
		}
	},
	Mutation: {
		async createContact(contact) {
			return await contactService.create(contact);
		},
		async updateContact(id, contact) {
			return await contactService.update(id, contact);
		}
	}
});

export default createController(resolvers);
