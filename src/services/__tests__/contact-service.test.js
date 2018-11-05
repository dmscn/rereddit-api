describe('ContactService', () => {
	describe('getAll', () => {
		it('should test', () => {
			let store = setup();
			store.getAll();
		});
	});

	describe('getSingle', () => {
		it('should test', () => {});
	});

	describe('add', () => {
		it('should test', () => {});
	});

	describe('update', () => {
		it('should test', () => {});
	});

	describe('remove', () => {
		it('should test', () => {});
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
    get: jest.fn(async id => contacts.find(id => contacts.id === id)),
    create: jest.fn(async contact => ({ ...contacts, contact })),
    update: jest.fn(async (id, data) => ({ ...contacts, contact })),
    remove: jest.fn(async id => undefined)
  };
  /* eslint-enable */
}
