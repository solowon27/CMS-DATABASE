const inquirer = require('inquirer');
const connection = require('./server');

function viewAllEmployees() {
  connection.query('SELECT * FROM EMPLOYEES', function (err, res) {
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
        name: 'dep_id',
        message: "Enter the employee's department id:"
      }
    ])
    .then(answers => {
      connection.query(
        'INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
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
  connection.query('SELECT * FROM ROLES', function (err, res) {
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
        'INSERT INTO ROLES (title, salary, dep_id) VALUES (?, ?, ?)',
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
  connection.query('SELECT * FROM DEPARTMENTS', function (err, res) {
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
        'INSERT INTO DEPARTMENTS (name) VALUES (?)',
        [answers.name],
        function (err, res) {
          if (err) throw err;
          console.log(res);
          promptUser();
        }
      );
    });
}

function updateEmployeesManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: "Enter the employee's ID:"
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the new manager ID for the employee:"
      }
    ])
    .then(answers => {
      const { employee_id, manager_id } = answers;
      const query = 'UPDATE EEMPLOYEES SET manager_id = ? WHERE id = ?';

      connection.query(query, [manager_id, employee_id], (err, res) => {
        if (err) throw err;
        console.log(res);
        promptUser();
      });
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
          '***more options ~',
          'update employees manager',
          'view employees by managers',
          'view employees by department',
          'delete department',
          'delete roles',
          'delete manager',
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
        case 'View All Roles':
          viewAllRole();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View all Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;

        //extra options
        case 'update employees manager':
          updateEmployeesManager();
          break;
        case 'view employees by managers':
          viewEmployeesByManager();
          break;
        case 'view employees by departments':
          viewEmployeesByDepartments();
          break;
        case 'delete departments':
          deleteDepartments();
          break;
        case 'delete roles':
          deleteRoles();
          break;
        case 'delete managers':
          deleteManagers();
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
