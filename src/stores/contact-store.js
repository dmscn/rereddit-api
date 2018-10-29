export default function createContactStore(logger) {
	let __contacts = [];
	let __ids = 1;

	return {
		async getAll() {
			logger.debug('Getting all contacts');
			return [...__contacts];
		},
		async getContact(id) {
			logger.debug(`Getting contact with id ${id}`);
			return __contacts.find(contact => contact.id === id);
		},
		async create(contact) {
			contact.id = ++__ids;
			logger.debug(`Creating contact with id ${__ids}`);
			__contacts = [...__contacts, contact];
			return __contacts;
		},
		async remove(id) {
			logger.debug(`Removing contact with id ${id}`);
			__contacts = __contacts.filter(contact => contact.id !== id);
			return __contacts;
		}
	};
}
