const inquirer = require('inquirer');
const connection = require('./server');

function viewAllEmployees() {
  connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.log(res);
    promptUser();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:"
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Enter the employee's role ID:"
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the employee's manager ID:"
      }
    ])
    .then(answers => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
        function (err, res) {
          if (err) throw err;
          console.log(res);
          promptUser();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: "Enter the employee's ID:"
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Enter the new role ID for the employee:"
      }
    ])
    .then(answers => {
      connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [answers.role_id, answers.employee_id],
        function (err, res) {
          if (err) throw err;
          console.log(res);
          promptUser();
        }
      );
    });
}

function viewAllRole() {
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.log(res);
    promptUser();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Enter the role's title:"
      },
      {
        type: 'input',
        name: 'salary',
        message: "Enter the role's salary:"
      },
      {
        type: 'input',
        name: 'department_id',
        message: "Enter the role's department ID:"
      }
    ])
    .then(answers => {
      connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [answers.title, answers.salary, answers.department_id],
        function (err, res) {
          if (err) throw err;
          console.log(res);
          promptUser();
        }
      );
    });
}

function viewAllDepartments() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.log(res);
    promptUser();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the department's name:"
      }
    ])
    .then(answers => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [answers.name],
        function (err, res) {
          if (err) throw err;
          console.log(res);
          promptUser();
        }
      );
    });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View all Departments',
          'Add Department',
          'Exit'
        ]
      }
    ])
    .then(answers => {
      console.log(answers);
      switch (answers.action) {
        case 'View all Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRole();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View all Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Exit':
          connection.end();
          console.log('Connection closed.');
          break;
        default:
          break;
      }
    });
}

promptUser();
