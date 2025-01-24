-- Departments
INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Sales'),
  ('Marketing'),
  ('Production'),
  ('Quality'),
  ('Shipping');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 100000, 1),
  ('Sales Manager', 80000, 2),
  ('Marketing Specialist', 60000, 3),
  ('Production Worker', 50000, 4),
  ('Quality Control', 40000, 5),
  ('Shipping Clerk', 35000, 6);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Alice', 'Johnson', 3, NULL),
  ('Bob', 'Brown', 4, NULL),
  ('Charlie', 'Davis', 5, NULL),
  ('Eve', 'Miller', 6, 2);
