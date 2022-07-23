const Employee = require('./Employee');

// create a manager constructor
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);

    // office number is added to the manager
    this.officeNumber = officeNumber;
    this.role = 'Manager';
  }

  getRole() {
    return this.role;
  }
}

module.exports = Manager;
