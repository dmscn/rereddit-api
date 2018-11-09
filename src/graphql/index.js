// // import { loadControllers } from 'awilix-koa';
// import { makeExecutableSchema } from 'graphql-tools';
// import resolvers from './resolvers';

// const typeDefs = `
// 	type Contact {
// 		_id: ID!
// 		name: String!
// 		email: String!
// 		phone: String
// 	}

// 	type Query {
// 		getContacts: [Contact]
// 		getContact: Contact
// 	}

// 	type Mutation {
// 		createContact(
// 			contact: Contact!
// 		): Contact,
// 		updateContact(
// 			id: ID!
// 			contact: Contact!
// 		): Contact
// 	}
// `;

// export default makeExecutableSchema({
// 	typeDefs,
// 	// resolvers: loadControllers(resolvers)
// 	resolvers
// });
