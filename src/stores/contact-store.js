export default function createContactStore(logger) {
	let __contacts = [];
	let __ids = 1;

	return {
		async getAll() {
			logger.debug('Getting all contacts');
			return [...__contacts];
		},
		async get(id) {
			logger.debug(`Getting contact with id ${id}`);
			return __contacts.find(contact => contact.id == id);
		},
		async create(contact) {
			contact.id = ++__ids;
			logger.debug(`Creating contact with id ${contact.id}`);
			__contacts = [...__contacts, contact];
			return contact;
		},
		async remove(id) {
			logger.debug(`Removing contact with id ${id}`);
			__contacts = __contacts.filter(contact => contact.id !== id);
			return undefined;
		},
		async update(id, contact) {
			contact.id = id;
			logger.debug(`Updating contact with id ${id}`);
			let index = __contacts.findIndex(contact => contact.id == id);
			if (index === -1) return null;
			__contacts[index] = contact;
			return __contacts[index];
		}
	};
}
