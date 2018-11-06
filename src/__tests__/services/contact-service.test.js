import { throws } from 'smid';
import ContactService from '../../services/contact-service';

const contact = {
	name: 'baz',
	phone: '777777777',
	email: 'baz@email.com'
};

describe('ContactService', () => {
	describe('getAll', () => {
		it('should get all contacts', async () => {
			const { service, contacts } = setup();
			expect(await service.getAll()).toEqual(contacts);
		});
	});

	describe('get', () => {
		it('should return not found', async () => {
			const { service } = setup();
			expect(await throws(await service.get('nonexistent')).message).toMatch(/not found/);
		});

		it('should get contact by id', async () => {
			const { service, contacts } = setup();
			expect(await service.get(1)).toEqual(contacts[0]);
			expect(await service.get(2)).toEqual(contacts[1]);
		});
	});

	describe('create', () => {
		it('should return bad request', async () => {
			const { service } = setup();
			expect((await throws(service.create())).message).toMatch(/No contact/);
			expect((await throws(service.create({ name: 'baz' }))).message).toMatch(/email/);
			expect(
				(await throws(service.create({ name: 'baz', email: 'baz@email.com' }))).message
			).toMatch(/phone/);
			expect(
				(await throws(service.create({ phone: '777777777', email: 'baz@email.com' }))).message
			).toMatch(/name/);
			expect((await throws(service.create({ phone: '777777777' }))).message).toMatch(/name/);
			expect((await throws(service.create({ email: 'baz@email.com' }))).message).toMatch(
				/name/
			);
		});

		it('should create a new contact', async () => {
			const { service } = setup();
			expect(await service.create(contact)).toMatchObject(contact);
		});
	});

	describe('update', () => {
		it('should return not found ', async () => {
			const { service } = setup();
			expect((await throws(service.update())).message).toMatch(/id/);
			expect((await throws(service.update(null, contact))).message).toMatch(/id/);
		});

		it('should return bad request', async () => {
			const { service } = setup();
			expect((await throws(service.update(1))).message).toMatch(/contact/);
		});

		it('should update contact', async () => {
			const { service } = setup();
			expect(await service.update(1, contact)).toMatchObject(contact);
		});
	});

	describe('remove', () => {
		it('should return not found', async () => {
			const { service } = setup();
			expect((await throws(service.remove())).message).toMatch(/id/);
		});

		it('should remove contact', async () => {
			const { service } = setup();
			expect(await service.remove(1)).toEqual(undefined);
		});
	});
});

function setup() {
	const contacts = [
		{ id: 1, name: 'Foo', phone: '999999999', email: 'foo@email.com' },
		{ id: 2, name: 'Bar', phone: '888888888', email: 'bar@email.com' }
	];

	/* eslint-disable */
  const store = {
    getAll: jest.fn(async () => [...contacts]),
    get: jest.fn(async id => contacts.find(contact => contact.id === id)),
    create: jest.fn(async contact => ({ ...contact, id: 3 })),
    update: jest.fn(async (id, data) => ({ ...contact, ...data })),
    remove: jest.fn(async id => undefined)
  };
  /* eslint-enable */
	return { service: new ContactService(store), store, contacts };
}
