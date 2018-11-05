import { NotFound, BadRequest } from 'fejl';

const assertId = BadRequest.makeAssert('No id given');

export default class ContactService {
	constructor(contactStore) {
		this.contactStore = contactStore;
	}

	async getAll() {
		return await this.contactStore.getAll();
	}

	async get(id) {
		assertId(id);
		const contact = await this.contactStore.get(id);
		return contact || NotFound.makeAssert(`Contact with id ${id} not found`);
	}

	async create(contact) {
		BadRequest.assert(contact, 'No contact given');
		BadRequest.assert(contact.name, 'No contact name given');
		BadRequest.assert(contact.email, 'No contact email given');
		BadRequest.assert(contact.phone, 'No contact phone given');
		return await this.contactStore.create(contact);
	}

	async remove(id) {
		assertId(id);
		return this.contactStore.remove(id);
	}

	async update(id, contact) {
		assertId(id);
		BadRequest.assert(contact, 'No contact given');
		return await this.contactStore.update(id, contact);
	}
}
