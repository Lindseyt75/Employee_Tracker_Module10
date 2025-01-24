// inquirer.js
const inquirer = require('inquirer');

const mainMenu = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit',
      ],
    },
  ]);
};

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);
};

const addRole = (departments) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the name of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departments.map(department => ({ name: department.name, value: department.id })),
    },
  ]);
};

const addEmployee = (roles, employees) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for the employee:',
      choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for the employee:',
      choices: [
        { name: 'None', value: null },
        ...employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
      ],
    },
  ]);
};

const updateEmployeeRole = (employees, roles) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select an employee to update:',
      choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role for the employee:',
      choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
  ]);
};

module.exports = {
  mainMenu,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
