// @flow
import { createController } from 'awilix-koa';
import graphqlHTTP from 'koa-graphql';
import typeDefs from '../graphql';

const api = contactService => ({
	Query: {
		contact(id) {
			return contactService.get(id);
		},
		contacts() {
			return contactService.getAll();
		}
	},
	Mutation: {
		createContact(contact) {
			return contactService.create(contact);
		},
		updateContact(id, contact) {
			return contactService.update(id, contact);
		}
	}
});

export default createController(api)
	.prefix('/graphql/contacts')
	.all(
		'',
		graphqlHTTP({
			schema: typeDefs.contact,
			resolver: api,
			graphiql: true
		})
	);
