const inquirer = require('inquirer')
const mySql = require('mysql')

const connection = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cms_db'
});