import { apiHelper } from '../../helpers/api-helper';

describe('contacts API', () => {
	it('should create contact', async () => {
		const api = await apiHelper();
		const contact = {
			name: 'Leonardo',
			phone: '999999999',
			email: 'leo@email.com'
		};
		const resp = await api.createContact({
			name: 'Leonardo',
			phone: '999999999',
			email: 'leo@email.com'
		});
		expect(resp.id).toBeDefined();
		expect(resp).toEqual(expect.objectContaining(contact));
	});
});
