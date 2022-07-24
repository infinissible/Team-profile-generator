const assignInfo = (info) => {
  if (info.getRole() === 'Manager') {
    return `Office number: ${info.officeNumber}`;
  } else if (info.getRole() === 'Engineer') {
    return `GitHub username: ${info.getGithub()}`;
  } else if (info.getRole() === 'Intern') {
    return `School: ${info.getSchool()}`;
  }
};

const generateCard = (employees) => {
  return `${employees
    .map((info) => {
      return `<div class="card">
    <div class="card-header">
      <h3>${info.getName()}<br /></h3>
      <p>${info.getRole()}</p>
    </div>
    <div class="info">ID: ${info.getId()} <br />Email: ${info.getMail()} <br />
    ${assignInfo(info)}
    </div>
  </div>`;
    })
    .join('')}`;
};

module.exports = (employee) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Team Profile Generator</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <header class="header">
        <h1>Team Alpha</h1>
      </header>
      <main>
      <section class="flex">
      ${generateCard(employee)}
    </section>
      </main>
    </body>
    `;
};
