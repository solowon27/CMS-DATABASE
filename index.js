
//this is our index file where we use select, insert, update, delete nd sum methods to manage our employment system

//select used for to view the entire selected table
//insert methodd is used for to add a row in a table
//the delete method reversly to remove a row from a table
//update is for change the value of the row
//and sum method is used for to get the sum of selected column in a table

//so just follow the comments to get more information and understanding for the app

const inquirer = require('inquirer');
const connection = require('./server'); //requiring the connection file where in server.js
const cTable = require('console.table'); //requiring the console.table package

function viewAllEmployees(connection) { //function to view all employees passing in the connection
  connection.query('SELECT * FROM EMPLOYEES', function (err, res) { //now we pass 3 arguments into our query function
    if (err) throw err; //and if there is an error we throw it
    console.table(res); //otherwise we console.table the response
    promptUser(connection); //by calling the promptUser function and passing in the connection
  });
}

function addEmployee(connection) { //function to add an employee passing in the connection
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
        name: 'department_id',
        message: "Enter the employee's department id:"
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the employee's manager ID:"
      }
    ])
    .then(answers => { //we use the .then method to pass in our answers
      connection.query(
        'INSERT INTO EMPLOYEES (first_name, last_name, role_id, department_id, manager_id) VALUES (?, ?, ?, ?, ?)', //we use the connection.query method to insert the answers into the database
        [answers.first_name, answers.last_name, answers.role_id, answers.department_id, answers.manager_id || null], 
        function (err, res) {
          if (err) throw err;
          console.table(res);
          promptUser(connection);
        }
      );
    });
}

function updateEmployeeRole(connection) { //function to update an employee's role
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
        'UPDATE EMPLOYEES SET role_id = ? WHERE emp_id = ?', //update the employee's role id where the employee id is equal to the employee id
        [answers.role_id, answers.employee_id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          promptUser(connection);
        }
      );
    });
}

function viewAllRole(connection) { //function to view all roles
  connection.query('SELECT * FROM ROLES', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser(connection);
  });
}

function addRole(connection) { //function to add a role
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
        'INSERT INTO ROLES (title, salary, department_id) VALUES (?, ?, ?)',
        [answers.title, answers.salary, answers.department_id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          promptUser(connection);
        }
      );
    });
}

function viewAllDepartments(connection) { //function to view all departments passing in the connection
  connection.query('SELECT * FROM DEPARTMENTS', function (err, res) {
    if (err) throw err;
    console.table(res);
    promptUser(connection);
  });
}

function addDepartment(connection) {
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
        'INSERT INTO DEPARTMENTS (dep_name) VALUES (?)',
        [answers.name],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          promptUser(connection);
        }
      );
    });
}

function updateEmployeesManager(connection) {
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
      const query = 'UPDATE EMPLOYEES SET manager_id = ? WHERE emp_id = ?';
      connection.query(query, [manager_id, employee_id], (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(connection);
      });
    });
}

function viewEmployeesByManager(connection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the manager's ID:"
      }
    ])
    .then(answers => {
      const { manager_id } = answers;
      const query = 'SELECT * FROM EMPLOYEES WHERE manager_id = ?';
      connection.query(query, [manager_id], (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(connection);
      });
    });
}

function viewEmployeesByDep(connection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dep_id',
        message: "Enter the department's ID:"
      }
    ])
    .then(answers => {
      const { dep_id } = answers;
      const query = 'SELECT * FROM EMPLOYEES WHERE department_id = ?';
      connection.query(query, [dep_id], (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(connection);
      });
    });
}

//on the following function, the deletion process is done in three steps
//because of the foreign key constraints
//we can't delete a department if there are employees or roles associated with it
function deleteDepartment(connection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dep_id',
        message: "Enter the department's ID you want to delete:"
      }
    ])
    .then(answers => {
      const { dep_id } = answers;
      const firstDeletion = 'DELETE FROM EMPLOYEES WHERE role_id IN (SELECT role_id FROM ROLES WHERE department_id = ?)'; //1st deletion
      connection.query(firstDeletion, [dep_id], (err, res) => {
        if (err) throw err;

        const secondDeletion = 'DELETE FROM ROLES WHERE department_id = ?';//second deletion
        connection.query(secondDeletion, [dep_id], (err, res) => {
          if (err) throw err;

          const thirdDeletion = 'DELETE FROM DEPARTMENTS WHERE dep_id = ?'; //and finally we can delete the desired department
          connection.query(thirdDeletion, [dep_id], (err, res) => {
            if (err) throw err;

            console.table(res);
            promptUser(connection);
          });
        });
      });
    });
}


function deleteRole(connection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role_id',
        message: "Enter the role's ID you want to delete:"
      }
    ])
    .then(answers => {
      const { role_id } = answers;
      const deleteEmployees = 'DELETE FROM EMPLOYEES WHERE role_id = ?';
      connection.query(deleteEmployees, [role_id], (err, employeeRes) => {
        if (err) throw err;

        const deleteRoleQuery = 'DELETE FROM ROLES WHERE role_id = ?';
        connection.query(deleteRoleQuery, [role_id], (err, roleRes) => {
          if (err) throw err;

          console.log('Role and associated employees deleted successfully.');
          promptUser(connection);
        });
      });
    });
}


function deleteManager(connection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the manager's ID you want to delete:"
      }
    ])
    .then(answers => {
      const { manager_id } = answers;
      const query = 'DELETE FROM MANAGERS WHERE manager_id = ?';
      connection.query(query, [manager_id], (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(connection);
      });
    });
}

function totalBudget(connection) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dep_id',
        message: "Enter the department's ID:"
      }
    ])
    .then(answers => {
      const { dep_id } = answers;
      const query = 'SELECT SUM(salary) FROM ROLES WHERE department_id = ?';
      connection.query(query, [dep_id], (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(connection);
      });
    });
}
//prompt questions divided in two functions to make the code more readable  and organized
//one function for the main questions and another one for the more options questions
function promptUser(connection) { //this is our main prompt questions function
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do? \n',
        choices: [
          'View all Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View all Departments',
          'Add Department',
          '\x1b[32m more options \x1b[0m',
          'Exit'
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case 'View all Employees':
          viewAllEmployees(connection);
          break;
        case 'Add Employee':
          addEmployee(connection);
          break;
        case 'View All Roles':
          viewAllRole(connection);
          break;
        case 'Update Employee Role':
          updateEmployeeRole(connection);
          break;
        case 'Add Role':
          addRole(connection);
          break;
        case 'View all Departments':
          viewAllDepartments(connection);
          break;
        case 'Add Department':
          addDepartment(connection);
          break;
        case '\x1b[32m more options \x1b[0m':
          moreOptions(connection);
          break;
        case 'Exit':
          connection.end();
          console.log('\x1b[32m Connection closed! \x1b[0m');
          break;
        default:
          break;
      }
    });
}
function moreOptions(connection) { //this is our more option and if the more option is not triggered the contents are not shown up
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'update employees manager',
          'view employees by managers',
          'view employees by departments',
          'delete department',
          'delete roles',
          'delete manager',
          'total utilized budget of a department',
          '\x1b[33m Back \x1b[0m',
        ]
      }
    ])
    .then(answers => {
      switch (answers.action) {
        case 'update employees manager':
          updateEmployeesManager(connection);
          break;
        case 'view employees by managers':
          viewEmployeesByManager(connection);
          break;
        case 'view employees by departments':
          viewEmployeesByDep(connection);
          break;
        case 'delete department':
          deleteDepartment(connection);
          break;
        case 'delete roles':
          deleteRole(connection);
          break;
        case 'delete manager':
          deleteManager(connection);
          break;
        case 'total utilized budget of a department':
          totalBudget(connection);
          break;
        case '\x1b[33m Back \x1b[0m':
          promptUser(connection);
          console.log('\x1b[32m Returned to Home. \x1b[0m'); 
          break;
        default:
          break;
      }
    });
}
// promptUser();
module.exports = { //finally here we export our promptuser to be used in server js
  promptUser
};