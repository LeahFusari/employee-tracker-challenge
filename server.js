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
      "View Employees by Department",
      "Add Employee",
      "Remove Employees",
      "Update Employee Role",
      "Add Role",
      "End"]
  })
  .then(function ({ task }) {
    switch (task) {
      case "View All Employees":
        viewAllEmployees();
        break;
    
      }
});
}

function viewAllEmployees() {

  console.log("Viewing All Employees\n");
  var query =
    `SELECT employees.id, CONCAT(first_name,' ',last_name) AS Employee_Name, 
    roles.title AS Position, roles.salary, depts.dept_name AS department, employees.manager_id
    FROM employees  
    JOIN roles ON roles.id = employees.role_id  
    JOIN depts ON roles.dept_id = depts.id 
    ORDER BY employees.id; 
    `
    //LEFT JOIN roles ON employees.role_id = roles.id;
  db.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!");
    // initPrompts();
  });

}

