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
let listAnswer;

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
  // .then((data) => {
  //   console.log(role);

  //   if (role === 'Engineer') {
  //     engineerQuestion(data);

  //     } else if (role === 'Engineer') {
  //       engineerQuestion();
  //     } else if (role === 'Intern') {
  //       internQuestion();
  //   }
  // });
  //   .then((answers) => {
  //     const member = new role(answers);
  //     employee.push(member);
  //     console.log(employee);
  //     return;
  //   })
  //   .catch((err) => console.log(err));
}

async function engineerQuestion() {
  await inquirer.prompt([
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
  ]);
}

async function managerQuestion(answers) {
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
      {
        type: 'list',
        name: 'role',
        message: "Which member's role would you like to add?",
        choices: ['Engineer', 'Intern', 'None'],
      },
    ])
    .then(({ officeNumber, role }) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        officeNumber
      );

      employee.push(manager);
      console.log(employee);

      listAnswer = role;
      return commonQuestions(role).then((answers) => {
        if (role === 'Engineer') {
          engineerQuestion(answers);
        }
      });
    });
}

// async function internQuestion() {
//   await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'school',
//       message: "What is the name of the intern's school? (required)",
//       validate: (schoolInput) => {
//         if (schoolInput) {
//           return true;
//         } else {
//           console.log("Please enter the intern's school.");
//           return false;
//         }
//       },
//     },
//   ]);
// }

// promptApp()
//   .then((answers) => {
//     return generateHTML(answers);
//   })
//   .then((htmlFile) => {
//     return writeToFile(htmlFile);
//   })
//   .then((htmlResponse) => {
//     console.log(htmlResponse);
//     return copyFile();
//   })
//   .then((copyfileResponse) => {
//     console.log(copyfileResponse);
//   })
//   .catch((err) => console.log(err));

commonQuestions('Manager').then((answers) => {
  managerQuestion(answers);
});
