USE employees_db;

UPDATE employee
SET role_id = 1
WHERE first_name = "John" AND last_name = "Doe";