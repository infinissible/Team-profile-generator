const Employee = require('./Employee');

// create an Engineer constructor
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);

    // get a username of github
    this.github = github;

    // set role to Engineer
    this.role = 'Engineer';
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return this.role;
  }
}

module.exports = Engineer;
