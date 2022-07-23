const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/page-template');

const writeToFile = (data) => {
  fs.writeFile('./dist/index.html', data, (err) => {
    if (err) {
      reject(err);
      return;
    }

    console.log('A HTML file generated !');
  });
};

const copyFile = () => {
  fs.copyFile('./src/style.css', './dist/style.css', (err) => {
    if (err) {
      reject(err);
      return;
    }

    console.log('style.css copied !');
  });
};

async function promptApp() {
  return await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the manager's name!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      return generateHTML(answers);
    })
    .then((htmlFile) => {
      return writeToFile(htmlFile);
    })
    .then((htmlResponse) => {
      console.log(htmlResponse);
      return copyFile();
    })
    .then((copyfileResponse) => {
      console.log(copyfileResponse);
    })
    .catch((err) => console.log(err));
}

promptApp();
