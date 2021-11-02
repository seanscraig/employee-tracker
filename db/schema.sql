DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL ,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE CASCADE
);

INSERT INTO department (name)
VALUES ('Engineering'),
       ('Sales'),
       ('Legal'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 2),
       ('Engineering Lead', 150000, 1),
       ('Legal Team Lead', 200000, 3),
       ('Account Manager', 200000, 4),
       ('Salesperson', 70000, 2),
       ('Software Engineer', 80000, 1),
       ('Lawyer', 90000, 3),
       ('Accountant', 90000, 4);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ('John', 'Doe', 2, NULL),
       ('Charlie', 'Chan', 1, NULL),
       ('Mike', 'Smith', 3, NULL),
       ('Sally', 'Brown', 4, NULL),
       ('Fred', 'Allen', 5, 2),
       ('Sarah', 'Lourd', 6, 1),
       ('Tom', 'Hanks', 7, 3),
       ('Ashley', 'Rodriguez', 8, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;