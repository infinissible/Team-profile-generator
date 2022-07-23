const Manager = require('../lib/Manager');

test('create a manager', () => {
  const manager = new Manager('Sarah', 1, 'sarah@gmail.com', '111-222-3333');

  expect(manager.name).toBe('Sarah');
  expect(manager.id).toEqual(expect.any(Number));
  expect(manager.email).toEqual(expect.any(String));
  expect(manager.officeNumber).toEqual(expect.any(String));
  expect(manager.role).toBe('Manager');
});

test('test the getRole() function', () => {
  const manager = new Manager('Sarah', 1, 'sarah@gmail.com', '111-222-3333');
  expect(manager.getRole()).toBe('Manager');
});
