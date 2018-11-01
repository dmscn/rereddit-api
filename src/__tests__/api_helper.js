import axios from 'axios';
import { logger } from 'handlebars';
import { createServer } from 'http';
import { memoize } from 'lodash';

export async function apiHelper() {
	const server = await startServer();
	const baseUrl = `http://localhost/${server.address().port}`;
	const client = axios.create({
		baseUrl
	});

	return {
		catch: catchAndLog,
		client,
		getAllContacts: params => client.get('/contacts', { params }),
		getContactById: id => client.get(`/contacts/${id}`),
		createContact: data => client.post('/contacts', data),
		removeContact: id => client.delete(`/contacts/${id}`),
		updateContact: (id, data) => client.put(`/contact/${id}`, data)
	};
}

export function assertStatus(status) {
	return async function statusAssert(resp) {
		if (resp.status !== status) {
			throw new Error(
				`Expected status ${status} but got status ${resp.status}: ${resp.request.method} ${
					resp.request.path
				}`
			);
		}
		return resp.data;
	};
}

export function catchAndLog(err) {
	if (err.response) {
		logger.error(
			`Error ${err.response.status} in request: ${err.response.request.method} ${
				err.response.request.path
			}`,
			err.response.data
		);
	}
	throw err;
}

const startServer = memoize(async () => {
	return (await createServer()).listen();
});

// eslint-disable-next-line no-undef
afterAll(async () => {
	const server = await startServer();
	return new Promise(resolve => server.close(resolve));
});
