USE employees_db;

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

INSERT INTO employee (first_name, last_name,role_id, mananger_id)
VALUES ('John', 'Doe', 2, NULL),
       ('Charlie', 'Chan', 1, NULL),
       ('Mike', 'Smith', 3, NULL),
       ('Sally', 'Brown', 4, NULL),
       ('Fred', 'Allen', 5, 2),
       ('Sarah', 'Lourd', 6, 1),
       ('Tom', 'Hanks', 7, 3),
       ('Ashley', 'Rodriguez', 8, 4);