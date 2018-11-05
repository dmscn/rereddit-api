import { apiHelper } from '../../helpers/api-helper';

const mockContact = {
	name: 'Leonardo',
	phone: '999999999',
	email: 'leo@email.com'
};

describe('contacts API', () => {
	it('should create contact', async () => {
		const api = await apiHelper();
		const resp = await api.create(mockContact);
		expect(resp.id).toBeDefined();
		expect(resp).toEqual(expect.objectContaining(mockContact));
	});

	it('should get user by id', async () => {
		const api = await apiHelper();
		let contact = await api.create(mockContact);
		const resp = await api.get(contact.id);
		expect(resp).toEqual(contact);
	});

	it('should update contact', async () => {
		const api = await apiHelper();
		let contact = await api.create(mockContact);
		const phone = '888888888';
		const resp = await api.update(contact.id, {
			...contact,
			phone
		});
		expect(resp.name).toEqual(mockContact.name);
		expect(resp.phone).not.toEqual(mockContact.phone);
	});

	it('should remove a contact', async () => {
		const api = await apiHelper();
		let contact = await api.create(mockContact);
		const resp = await api.remove(contact.id);
		expect(resp).toBeFalsy();
	});

	it('should get all contacts', async () => {
		const api = await apiHelper();
		const resp = await api.getAll();
		expect(resp).toHaveLength(4);
	});
});
