// @flow
import { createController } from 'awilix-koa';
import graphqlHTTP from 'koa-graphql';
import Schema from '../graphql';

const api = contactService => ({
	graphql: graphqlHTTP({
		schema: Schema,
		graphiql: true
	})
});

export default createController(api)
	.prefix('/graphql')
	.all('', 'graphql');
