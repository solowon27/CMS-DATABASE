const inquirer = require('inquirer')
//const mySql = require('mysql')

var questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [ 'view all Employees',
                    'Add Employee',
                    'update Employee Role',
                    'view All Role?',
                    'Add Role',
                    'view all Departments',
                    'Add Department',  
    ]
    },

];

inquirer.prompt(questions).then(answers => {
    console.log(answers)
    switch (answers.action) {
        case 'view all Employees':
            viewAllEmployees()
            break;
        case 'Add Employee':
            addEmployee()
            break;
        case 'update Employee Role':
            updateEmployeeRole()
            break;
        case 'view All Role?':
            viewAllRole()
            break;
        case 'Add Role':
            addRole()
            break;
        case 'view all Departments':
            viewAllDepartments()
            break;
        case 'Add Department':
            addDepartment()
            break;
        default:
            break;
    }
}
);

