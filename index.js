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
        // db.end();
        return;

      default:
        console.log("Not an option.");
    }
  });
}

menu();

// formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
  const sql = `SELECT employee.id,
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      role.salary, 
                      department.name AS department,
                      CONCAT(manager.first_name, " ",manager.last_name) AS manager
               FROM employee
               JOIN role ON employee.role_id = role.id
               JOIN department ON role.department_id = department.id
               JOIN employee manager ON manager.id = employee.manager_id;`;
  db.query(sql, function (err, results) {
    console.log(`Showing Employees...\n`);
    console.table(results);
    menu();
  });
}

// prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  console.log("View All Employees not implemented yet");
  menu();
}

// prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole() {
  console.log("Update Employee Role not implemented yet");
  menu();
}

// the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
  const sql = `SELECT role.id AS role_id, 
                      role.title, 
                      role.salary, 
                      department.name AS department 
               FROM role 
               JOIN department ON role.department_id = department.id`;
  db.query(sql, function (err, results) {
    console.log(`Showing Roles...\n`);
    console.table(results);
    menu();
  });
}

// formatted table showing department names and department ids
function viewAllDepartments() {
  const sql = `SELECT id, 
                      name 
               FROM department`;
  db.query(sql, function (err, results) {
    if (err) throw err;
    console.log(`Showing Departments...\n`);
    console.table(results);
    menu();
  });
}

// prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  inquirer
    .prompt([
      {
        message: "What is the title of the role you want to add?",
        name: "title",
      },
      {
        message: "What is the the salary for the role you want to add?",
        name: "salary",
      },
    ])
    .then((answer) => {
      const arrParams = [answer.title, answer.salary];
      const deptSql = `SELECT name FROM department;`;
      db.query(deptSql, function (err, results) {
        if (err) throw err;
        const resultArr = results;
        inquirer
          .prompt([
            {
              type: "list",
              message: "What department is this role in?",
              choices: resultArr,
              name: "department",
            },
          ])
          .then((answer) => {
            const idSql = `SELECT id FROM department WHERE name = ?;`;

            db.query(idSql, answer.department, function (err, result) {

              arrParams.push(result[0].id);

              const sql = `INSERT INTO role (title, salary, department_id) 
                         VALUES(?, ?, ?)`;

              db.query(sql, arrParams, function (err, results) {
                if (err) throw err;
                console.log(`Adding ${arrParams[0]}...\n`);
                menu();
              });
            });
          });
      });
    });
}

// prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  // console.log("Add Department not implemented yet");
  inquirer
    .prompt([
      {
        message: "What is the name of the department you want to add?",
        name: "name",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) 
                   VALUES(?)`;
      db.query(sql, answer.name, function (err, results) {
        if (err) throw err;
        console.log(`Adding ${answer.name}...\n`);
        menu();
      });
    });
}

// whenever a request comes in that that doesn't have a route it will be handled here
app.use((req, res) => {
  res.status(404).end();
});

// starts up the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
