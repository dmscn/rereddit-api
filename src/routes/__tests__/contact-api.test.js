import { apiHelper } from '../../helpers/api-helper';

const mockContact = {
	name: 'Leonardo',
	phone: '999999999',
	email: 'leo@email.com'
};

describe('contacts API', () => {
	it('should create contact', async () => {
		const api = await apiHelper();
		const resp = await api.createContact(mockContact);
		expect(resp.id).toBeDefined();
		expect(resp).toEqual(expect.objectContaining(mockContact));
	});

	it('should get user by id', async () => {
		const api = await apiHelper();
		let contact = await api.createContact(mockContact);
		const resp = await api.getContactById(contact.id);
		expect(resp).toEqual(contact);
	});

	it('should update contact', async () => {
		const api = await apiHelper();
		let contact = await api.createContact(mockContact);
		const phone = '888888888';
		const resp = await api.updateContact(contact.id, {
			...contact,
			phone
		});
		expect(resp.name).toEqual(mockContact.name);
		expect(resp.phone).not.toEqual(mockContact.phone);
	});

	it('should remove a contact', async () => {
		const api = await apiHelper();
		let contact = await api.createContact(mockContact);
		const resp = await api.removeContact(contact.id);
		expect(resp).toBeFalsy();
	});

	it('should get all contacts', async () => {
		const api = await apiHelper();
		const resp = await api.getAllContacts();
		expect(resp).toHaveLength(4);
	});
});
