import { buildSchema } from 'graphql';

export const schema = buildSchema(`
	type Query {
    contact(id: String!): Contact
    contacts: [Contact]
  },

  type Contact {
    id: String
    name: String
    email: String
    phone: String
  }
`);
