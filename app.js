// app.js
const { queryDatabase } = require('./db');
const inquirer = require('./inquirer');

// Function to fetch all departments
const viewDepartments = async () => {
  const res = await queryDatabase('SELECT * FROM department');
  console.table(res.rows);
};

// Function to fetch all roles
const viewRoles = async () => {
  const res = await queryDatabase(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
};

// Function to fetch all employees
const viewEmployees = async () => {
  const res = await queryDatabase(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, manager.first_name AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  console.table(res.rows);
};

// Function to add a department
const addDepartment = async () => {
  const { name } = await inquirer.addDepartment();
  await queryDatabase('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Department "${name}" added.`);
};

// Function to add a role
const addRole = async () => {
  const departments = await queryDatabase('SELECT * FROM department');
  const { title, salary, department_id } = await inquirer.addRole(departments.rows);
  await queryDatabase('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Role "${title}" added.`);
};

// Function to add an employee
const addEmployee = async () => {
  const roles = await queryDatabase('SELECT * FROM role');
  const employees = await queryDatabase('SELECT * FROM employee');
  const { first_name, last_name, role_id, manager_id } = await inquirer.addEmployee(roles.rows, employees.rows);
  await queryDatabase('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log(`Employee "${first_name} ${last_name}" added.`);
};

// Function to update an employee's role
const updateEmployeeRole = async () => {
  const employees = await queryDatabase('SELECT * FROM employee');
  const roles = await queryDatabase('SELECT * FROM role');
  const { employee_id, role_id } = await inquirer.updateEmployeeRole(employees.rows, roles.rows);
  await queryDatabase('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log('Employee role updated.');
};

// Main function to run the application
const startApp = async () => {
  let quit = false;

  while (!quit) {
    const { action } = await inquirer.mainMenu();

    switch (action) {
      case 'View all departments':
        await viewDepartments();
        break;
      case 'View all roles':
        await viewRoles();
        break;
      case 'View all employees':
        await viewEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Quit':
        quit = true;
        break;
      default:
        break;
    }
  }

  process.exit();
};

startApp();
