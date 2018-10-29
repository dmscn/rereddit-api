import { BadRequest } from 'fejl';

const assertId = BadRequest.makeAssert('No id given');

export default class ContactService {
	constructor(contactStore) {
		this.contactStore = contactStore;
	}

	async getAll() {
		return this.contactStore.getAll();
	}

	async getContact(id) {
		assertId(id);
		return this.contactStore.get(id);
	}

	async create(contact) {
		BadRequest.assert(contact, 'No contact given');
		BadRequest.assert(contact.name, 'No contact name given');
		BadRequest.assert(contact.phone, 'No contact phone given');
		BadRequest.assert(contact.email, 'No contact email given');
		return this.contactStore.add(contact);
	}

	async remove(id) {
		assertId(id);
		this.contactStore = this.contactStore.filter(contact => contact.id !== id);
		return this.contactStore;
	}

	async update(id, contact) {
		assertId(id);
		BadRequest.assert(contact, 'No contact given');
		BadRequest.assert(contact.name, 'No contact name given');
		BadRequest.assert(contact.phone, 'No contact phone given');
		BadRequest.assert(contact.email, 'No contact email given');
		return this.contactStore.update(id, contact);
	}
}
