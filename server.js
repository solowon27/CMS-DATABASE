const express = require('express');
const mySql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mySql.createConnection({
    host: 'localhost',
    port: PORT,
    user: 'root',
    password: '',
    database: 'CMS_DB'
});

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function addEmployee() {
    connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("", "", , )', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function updateEmployeeRole() {
    connection.query('UPDATE employee SET role_id =  WHERE id = ', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function viewAllRole() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}
function addRole() {
    connection.query('INSERT INTO role (title, salary, department_id) VALUES ("", , )', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

function addDepartment() {
    connection.query('INSERT INTO department (name) VALUES ("")', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
}
);

module.exports = connection;