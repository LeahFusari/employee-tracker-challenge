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

  
  module.exports = db;