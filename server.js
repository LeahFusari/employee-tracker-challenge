const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'MySql2021!!',
    database: 'employee_tracker'
  });

db.connect(function (err) {
  if (err) throw err;
  console.log(`Welcome to the EMPLOYEE MANAGER`)

  // function call here to start the initial app prompts
  initPrompts()
});

function initPrompts(){
  inquirer.prompt({
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add an Employee",
      "Add a Department",
      "Update Employee Role",
      "Add a Role",
      "End"]
  })
  .then(function ({ task }) {
    switch (task) {

      case "View All Employees":
        viewAllEmployees();
        break;

      case 'View All Departments':
        viewDepts();
        break;

      case 'View All Roles':
        viewRoles();
        break;  
      }
    });
}

function viewAllEmployees() {

  console.log("Viewing All Employees\n");
  var query =
    `SELECT employees.id, first_name, last_name, roles.title,
    roles.salary, depts.dept_name AS department, employees.manager_id
    FROM employees
    JOIN roles ON roles.id = employees.role_id  
    JOIN depts ON roles.dept_id = depts.id
    ORDER BY employees.id;
    `
   
  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!");
    // initPrompts();
  });
}

function viewDepts() {

  console.log("Viewing Departments\n");
  var query =
    `SELECT * FROM depts`
   
  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Departments viewed!");
    // initPrompts();
  });
}

function viewRoles() {

  console.log("Viewing All Roles\n");
  var query =
    `SELECT roles.id, roles.title AS Position, depts.dept_name AS department, roles.salary
    FROM roles
    JOIN depts ON roles.dept_id = depts.id
    ORDER BY roles.id;
    `
   
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("Roles viewed!");
    // initPrompts();
  });
}