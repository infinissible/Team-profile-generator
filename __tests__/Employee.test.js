const Employee = require('../lib/Employee');

test('create an employee', () => {
  const employee = new Employee('Sam', 1, 'sam@gmail.com');

  expect(employee.name).toBe('Sam');
  expect(employee.id).toEqual(expect.any(Number));
  expect(employee.email).toEqual(expect.any(String));
  expect(employee.role).toBe('Employee');
});

test('test getName() function', () => {
  const employee = new Employee('Sam', 1, 'sam@gmail.com');

  expect(employee.getName()).toBe('Sam');
});

test('test getId() function', () => {
  const employee = new Employee('Sam', 1, 'sam@gmail.com');

  expect(employee.getId()).toEqual(expect.any(Number));
});

test('test getEmail() function', () => {
  const employee = new Employee('Sam', 1, 'sam@gmail.com');

  expect(employee.getMail()).toEqual(expect.any(String));
});

test('test getRole() function', () => {
  const employee = new Employee('Sam', 1, 'sam@gmail.com');

  expect(employee.getRole()).toBe('Employee');
});
