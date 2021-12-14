// const db = require('./db/connection');//change password before submitting
// const mysql2 = require("mysql2");
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
  console.log("connected to database");
  console.log(`
`)
  // runs the app
  // Prompt();
});





