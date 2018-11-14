// @flow
import axios from 'axios';
import { logger } from '../lib/logger';
import { createServer } from '../lib/server';
import { memoize } from 'lodash';

export async function apiHelper() {
	const server = await startServer();
	const baseURL = `http://localhost:${server.address().port}`;
	const client = axios.create({
		baseURL
	});

	return {
		catch: catchAndLog,
		client
	};
}

export function assertStatus(status: number) {
	return async function statusAssert(resp: any) {
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

function catchAndLog(err) {
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
