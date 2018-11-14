// @flow
import Contact from '../models/contact-model';

export default function createContactStore(logger) {
	return {
		async getAll() {
			logger.debug('Getting all contacts');
			return Contact.find();
		},
		async get(id) {
			logger.debug(`Getting contact with id ${id}`);
			return Contact.findById(id);
		},
		async create(contact) {
			logger.debug(`Creating contact with id ${contact.id}`);
			return await new Contact(contact).save();
		},
		async update(id, contact) {
			logger.debug(`Updating contact with id ${id}`);
			return await Contact.findByIdAndUpdate(id, contact);
		},
		async remove(id) {
			logger.debug(`Removing contact with id ${id}`);
			return Contact.findByIdAndRemove(id);
		}
	};
}
