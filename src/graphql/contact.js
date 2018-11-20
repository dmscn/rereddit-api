export default `
	type Contact {
		_id: ID!
		name: String!
		email: String!
		phone: String
	}

	type Query {
		contact: Contact
		contacts: [Contact]
  }
  
  input ContactInput {
    _id: ID
    name: String!
    email: String!
    phone: String!
  }

	type Mutation {
		createContact(
			contact: ContactInput!
		): Contact,
		updateContact(
			id: ID!
			contact: ContactInput!
		): Contact
	}
`;
