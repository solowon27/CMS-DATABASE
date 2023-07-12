const mysql = require('mysql2');
require('dotenv').config();
const index = require('./index');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the CMS_DB database.');
  index.promptUser(connection);
});

module.exports = connection;
