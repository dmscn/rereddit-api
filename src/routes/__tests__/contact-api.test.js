import mongoose from 'mongoose';

import { apiHelper } from '../../helpers/api-helper';

const Contacts = mongoose.model('Contact');

let mockContact = {
	name: 'Vergie Maggio',
	phone: '600-015-0817',
	email: 'email@email.com'
};

describe('contacts API', () => {
	it('should create contact', async () => {
		const api = await apiHelper();
		const resp = await api.createContact(mockContact);
		expect(resp.id).toBeDefined();
		expect(resp).toEqual(expect.objectContaining(mockContact));
		mockContact = resp;
	});

	it('should get user by id', async () => {
		const api = await apiHelper();
		const resp = await api.getContactById(mockContact.id);
		expect(resp).toEqual(mockContact);
	});

	it('should update contact', async () => {
		const api = await apiHelper();
		const phone = '888888888';
		const resp = await api.updateContact(mockContact.id, {
			...mockContact,
			phone
		});
		expect(resp.name).toEqual(mockContact.name);
		expect(resp.phone).not.toEqual(mockContact.phone);
		mockContact = resp;
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
