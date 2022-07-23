const Engineer = require('../lib/Engineer');

test('create an Engineer', () => {
  const engineer = new Engineer('John', 1, 'John@gmail.com', 'johngithub');

  expect(engineer.name).toBe('John');
  expect(engineer.id).toEqual(expect.any(Number));
  expect(engineer.email).toEqual(expect.any(String));
  expect(engineer.github).toEqual(expect.any(String));
  expect(engineer.role).toBe('Engineer');
});

test('test the getGithub() function', () => {
  const engineer = new Engineer('John', 1, 'John@gmail.com', 'johngithub');

  expect(engineer.getGithub()).toBe('johngithub');
});

test('test the getRole() function', () => {
  const engineer = new Engineer('John', 1, 'John@gmail.com', 'johngithub');

  expect(engineer.getRole()).toBe('Engineer');
});
