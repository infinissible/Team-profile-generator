const Intern = require('../lib/Intern');

test('create an Intern', () => {
  const intern = new Intern('Paul', 1, 'paul@gmail.com', 'UCR');

  expect(intern.name).toBe('Paul');
  expect(intern.id).toEqual(expect.any(Number));
  expect(intern.email).toEqual(expect.any(String));
  expect(intern.school).toEqual(expect.any(String));
  expect(intern.role).toBe('Intern');
});

test('test the getSchool() function', () => {
  const intern = new Intern('Paul', 1, 'paul@gmail.com', 'UCR');

  expect(intern.getSchool()).toBe('UCR');
});

test('test the getRole() function', () => {
  const intern = new Intern('Paul', 1, 'paul@gmail.com', 'UCR');

  expect(intern.getRole()).toBe('Intern');
});
