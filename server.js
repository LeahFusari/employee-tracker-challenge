const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'MySql2021!!',
    database: 'employee_tracker'
  });

db.connect(function (err) { //CHANGE TO ARROW FUNCTION
  if (err) throw err;
  console.log(`Welcome to the EMPLOYEE MANAGER`)

  // function call here to start the initial app prompts
  initPrompts()
});

function initPrompts(){ //CHANGE TO ARROW FUNCTION
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
  .then(function ({ task }) { //CHANGE TO ARROW FUNCTION
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

      case 'Add a Department':
        addDept();
        break; 

      case 'Add a Role':
        addRole();
        break; 

      case 'Add an Employee':
      addEmp();
      break;
      }
    });
}

const viewAllEmployees = () => {

  // for last LEFT JOIN:  <table> <new column name> ON <new column name>.<table PK id> = <table>.<field>
  console.log("Viewing All Employees\n");
  var query =
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title,
    roles.salary, depts.dept_name AS department, CONCAT(manager.first_name,' ',manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON roles.id = employees.role_id  
    LEFT JOIN depts ON roles.dept_id = depts.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id
    ORDER BY employees.id;
    `
   
  db.query(query, function (err, res) { //CHANGE TO ARROW FUNCTION
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!");
    initPrompts();
  });
}

const viewDepts = () => {

  console.log("Viewing Departments\n");
  var query =
    `SELECT * FROM depts`
   
  db.query(query, function (err, res) { //CHANGE TO ARROW FUNCTION
    if (err) throw err;

    console.table(res);
    console.log("Departments viewed!");
    initPrompts();
  });
}

const viewRoles = () => {

  console.log("Viewing All Roles\n");
  var query =
    `SELECT roles.id, roles.title, depts.dept_name AS department, roles.salary
    FROM roles
    JOIN depts ON roles.dept_id = depts.id
    ORDER BY roles.id;
    `
   
  db.query(query, function (err, res) { //CHANGE TO ARROW FUNCTION
    if (err) throw err;
    console.table(res);
    console.log("Roles viewed!");
    initPrompts();
  });
}

const addDept = () => {

  console.log("Add a Department\n");

  inquirer.prompt([
    {
        name: "dept_name",
        type: "input",
        message: "Enter Department Name"
    }
]).then((answer) => {

  db.query(`INSERT INTO depts (dept_name) VALUES (?)`,[answer.dept_name], (err, res) => {
  if (err) throw err;
  console.log('The new department was successfully added!');

      db.query(`SELECT * FROM depts`, (err, res) => {
          if (err) {
              res.status(500).json({ error: err.message })
              return;
          }
          console.table(res);
         initPrompts()
      });
  });
  });
};

const addRole = () => {

  console.log("Add a Role\n");

  db.query(`SELECT * FROM depts`, (err, res) => {
    var departmentChoices = res.map(department => ({
      name: department.dept_name,
      value: department.id
    }))
      // console.log(departmentChoices)
  

  inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "Please enter the title of role."
    },
    {
        name: "salary",
        type: "input",
        message: "Please enter the role salary (decimal)"
    },
    {
        name: "dept_id",
        type: "list",
        message: "Please choose a department for the role.",
        choices: departmentChoices
    }
]).then((answer) => {

  db.query(`INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)`, 
  [answer.title, answer.salary, answer.dept_id], (err, res) => {
  
    if (err) throw err;
      console.log('The new role was successfully added!');

      db.query(`SELECT * FROM roles`, (err, res) => {
          if (err) {
              res.status(500).json({ error: err.message })
              return;
          }
          console.table(res);
         initPrompts()
      });
  });
  });
})
};

const addEmp = () => {

  console.log("Add an Employee\n");

  db.query(`SELECT * FROM roles`, (err, res) => {
    var roleChoices = res.map(role => ({
      name: role.title,
      value: role.id
    }))

    inquirer.prompt([
    {
        name: "first_name",
        type: "input",
        message: "Please enter the NEW EMPLOYEE first name."
    },
    {
        name: "last_name",
        type: "input",
        message: "Please enter the NEW EMPLOYEE last name."
    },
    {
        name: "role_id",
        type: "list",
        message: "Please choose a ROLE for the NEW EMPLOYEE.",
        choices: roleChoices
    },
    // {
    //     name: "manager_id",
    //     type: "list",
    //     message: "Please choose a Manager for the NEW EMPLOYEE.",
    //     choices: mgrChoices
    // }

    ]).then((answer) => {

      db.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`, 
    [answer.first_name, answer.last_name, answer.role_id], (err, res) => {
  
    if (err) throw err;
      console.log('The new employee was successfully added!');

      db.query(`SELECT * FROM employees`, (err, res) => {
          if (err) {
              res.status(500).json({ error: err.message })
              return;
          }
          console.table(res);
         initPrompts()
      });
    });
  });
})
};

// const addEmp = () => {

//   console.log("Add an Employee\n");

//   inquirer.prompt([
//     {
//       name: "first_name",
//       type: "input",
//       message: "Please enter employee first name."
//   },
//   {
//       name: "last_name",
//       type: "input",
//       message: "Please enter employee last name."
//   },
//   {
//       name: "role_id",
//       type: "number",
//       message: "Please enter the role id number for the employee."
//   },
//   {
//       name: "manager_id",
//       type: "number",
//       message: "Please enter the employee number of the manager for this employee."
//   }

// ]).then((answer) => {

//   db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
//   [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
  
//     if (err) throw err;
//       console.log('The new employee was successfully added!');

//       db.query(`SELECT * FROM employees`, (err, res) => {
//           if (err) {
//               res.status(500).json({ error: err.message })
//               return;
//           }
//           console.table(res);
//          initPrompts()
//       });
//   });
//   });
// };