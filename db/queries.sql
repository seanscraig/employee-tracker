USE employees_db;

SELECT role.id AS role_id, 
       role.title, 
       role.salary, 
       department.name AS department 
FROM role 
JOIN department ON role.department_id = department.id
ORDER BY role.id ASC;