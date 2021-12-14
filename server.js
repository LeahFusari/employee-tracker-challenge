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
      "View Employees",
      "View Employees by Department",
      "Add Employee",
      "Remove Employees",
      "Update Employee Role",
      "Add Role",
      "End"]
  })
};





