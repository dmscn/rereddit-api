import { BadRequest } from 'fejl';

const assertId = BadRequest.makeAssert('No id given');

export default class ContactService {
	constructor(contactStore) {
		this.contactStore = contactStore;
	}

	async getAll() {
		return await this.contactStore.getAll();
	}

	async getContact(id) {
		assertId(id);
		return await this.contactStore.get(id);
	}

	async create(contact) {
		BadRequest.assert(contact, 'No contact given');
		BadRequest.assert(contact.name, 'No contact name given');
		BadRequest.assert(contact.phone, 'No contact phone given');
		BadRequest.assert(contact.email, 'No contact email given');
		return await this.contactStore.add(contact);
	}

	async remove(id) {
		assertId(id);
		await this.contactStore.remove(id);
		return this.contactStore;
	}

	async update(id, contact) {
		assertId(id);
		BadRequest.assert(contact, 'No contact given');
		BadRequest.assert(contact.name, 'No contact name given');
		BadRequest.assert(contact.phone, 'No contact phone given');
		BadRequest.assert(contact.email, 'No contact email given');
		return await this.contactStore.update(id, contact);
	}
}
