-- Fetch all departments
SELECT * FROM department;

-- Fetch all roles with their department and salary
SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department ON role.department_id = department.id;

-- Fetch all employees with their details
SELECT 
  employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title AS role, 
  department.name AS department, 
  role.salary, 
  manager.first_name AS manager
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;
