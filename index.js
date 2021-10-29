// importing the required packages (inquirer, express and mysql2)
const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

// importing the menu prompt object
const menuPrompt = require("./prompts/menuPrompt");

// setting up ports and express
const PORT = process.env.PORT || 3001;
const app = express();

// middleware top parses url encoded objects and the second parses json objects into the body property on the request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

function menu() {
  inquirer.prompt(menuPrompt).then((answer) => {
    switch (answer.menuInput) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Update Employee Role":
        updateEmployeeRole();
        break;

      case "View All Roles":
        viewAllRoles();
        break;

      case "Add Role":
        addRole();
        break;

      case "View All Departments":
        viewAllDepartments();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Quit":
        console.log("Quit, have a nice day!");
        db.end();
        return;

      default:
        console.log("Not an option.");
    }
  });
}

menu();

function viewAllEmployees() {
  console.log("View All Employees not implemented yet");
  menu();
}

function addEmployee(){
  console.log("Add Employee not implemented yet");
  menu();
}

function updateEmployeeRole(){
  console.log("Update Employee Role not implemented yet");
  menu();
}

function viewAllRoles() {
  const sql = "SELECT * FROM role";
  db.query(sql, function (err, results) {
    console.log(`Showing Roles...\n`);
    console.table(results);
    menu();
  });
}

function addRole(){
  console.log("Add Role not implemented yet");
  menu();
}

function viewAllDepartments() {
  const sql = "SELECT id, name FROM department";
  db.query(sql, function (err, results) {
    if (err) throw err;
    console.log(`Showing Departments...\n`);
    console.table(results);
    menu();
  });
}

function addDepartment() {
  console.log("Add Department not implemented yet");
  menu();
}

// whenever a request comes in that that doesn't have a route it will be handled here
app.use((req, res) => {
  res.status(404).end();
});

// starts up the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});