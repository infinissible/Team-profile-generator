const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/page-template');

// create a index.html file in dist directory
const writeToFile = (data) => {
  fs.writeFile('./dist/index.html', data, (err) => {
    if (err) {
      reject(err);
      return;
    }

    console.log('A HTML file generated !');
  });
};

// copy the style.css file from src directory to dist directory
const copyFile = () => {
  fs.copyFile('./src/style.css', './dist/style.css', (err) => {
    if (err) {
      reject(err);
      return;
    }

    console.log('style.css copied !');
  });
};

// create an array for employees to push
const employee = [];

// create an inquirer for engineer
async function engineerQuestion(commonAnswers) {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'github',
        message: "What is your engineer's GitHub username? (required)",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("Please enter the engineer's github uername.");
            return false;
          }
        },
      },
    ])
    .then(({ github }) => {
      const engineer = new Engineer(
        commonAnswers.name,
        commonAnswers.id,
        commonAnswers.email,
        github
      );

      employee.push(engineer);
    });
}

// create an inquirer for intern
async function internQuestion(commonAnswers) {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'school',
        message: "What is the name of the intern's school? (required)",
        validate: (schoolInput) => {
          if (schoolInput) {
            return true;
          } else {
            console.log("Please enter the intern's school.");
            return false;
          }
        },
      },
    ])
    .then(({ school }) => {
      const intern = new Intern(
        commonAnswers.name,
        commonAnswers.id,
        commonAnswers.email,
        school
      );

      employee.push(intern);
    });
}

// create an inquirer for common questions
async function commonQuestions(role) {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `What is the ${role}'s name? (Required)`,
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter the ${role}'s name!`);
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'id',
      message: `What is the ${role}'s id? (Required)`,
      validate: (idInput) => {
        if (idInput) {
          return true;
        } else {
          console.log(`Please enter the ${role}'s id!`);
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'email',
      message: `What is the ${role}'s email? (Required)`,
      validate: (emailInput) => {
        if (emailInput) {
          return true;
        } else {
          console.log(`Please enter the ${role}'s email!`);
          return false;
        }
      },
    },
  ]);
}

// pop up add employee inquirer if it is required to add more employee
async function addEmployee() {
  await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add employee?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'confirmEnd',
        message: 'Do you want to end the program?',
        default: false,
        when: ({ confirmAddEmployee }) => confirmAddEmployee === false,
      },
      {
        type: 'list',
        name: 'role',
        message: "Which member's role would you like to add?",
        choices: ['Engineer', 'Intern', 'None'],
        when: ({ confirmAddEmployee }) => confirmAddEmployee,
      },
    ])
    .then(({ confirmAddEmployee, confirmEnd, role }) => {
      if (confirmAddEmployee && role === 'Engineer') {
        commonQuestions('Engineer').then((answers) => {
          engineerQuestion(answers).then(addEmployee);
        });
      } else if (confirmAddEmployee && role === 'Intern') {
        commonQuestions('Intern').then((answers) => {
          internQuestion(answers).then(addEmployee);
        });
      } else if ((confirmAddEmployee && role === 'None') || confirmEnd) {
        console.log('Good Bye !');
        console.log(employee);
        writeToFile(generateHTML(employee));
      } else if (!confirmEnd) {
        return addEmployee();
      }
    });
}

// run managerQuestion when propmt starts
async function managerQuestion(commonAnswers) {
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'officeNumber',
        message: "What is the team manager's office number? (Required)",
        validate: (officeNumberInput) => {
          if (officeNumberInput) {
            return true;
          } else {
            console.log("Please enter the manager's office number!");
            return false;
          }
        },
      },
    ])
    .then(({ officeNumber }) => {
      const manager = new Manager(
        commonAnswers.name,
        commonAnswers.id,
        commonAnswers.email,
        officeNumber
      );

      employee.push(manager);
      addEmployee();
    });
}

// welcome log added
async function initApp() {
  console.log(`
  ===================================
  Welcome to Team profile generator !
  ===================================
  `);

  await commonQuestions('Manager')
    .then((answers) => {
      managerQuestion(answers);
    })
    .catch((err) => console.log(err));
  // .then(async (data) => {
  //   return generateHTML(data);
  // })
  // .then((htmlFile) => {
  //   return writeToFile(htmlFile);
  // })
  // .then((htmlResponse) => {
  //   console.log(htmlResponse);
  //   return copyFile();
  // })
  // .then((copyfileResponse) => {
  //   console.log(copyfileResponse);
  // })
  // .catch((err) => console.log(err));
}

initApp();
