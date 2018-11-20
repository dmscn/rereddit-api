import { makeExecutableSchema } from 'graphql-tools';
import { buildSchema } from 'graphql';
import resolvers from './resolvers';

const schema = buildSchema(`
	type Contact {
		_id: ID!
		name: String!
		email: String!
		phone: String
	}

	type Query {
		contacts: [Contact]
		contact: Contact
	}
`);

export default schema;

// export default makeExecutableSchema({
// 	typeDefs,
// 	resolvers: resolvers.contactResolver
// });
