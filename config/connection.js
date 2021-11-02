const mysql = require("mysql2");

// connecting the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  // sanity check
  console.log("Connected to the employees_db database.")
);

module.exports = db;