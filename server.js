const mySql = require('mysql2');
const sequelize = require('./config/sequelize'); 
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3001;

const connection = mySql.createConnection(
  {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the CMS_DB database.`)
);

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected to the CMS database.');
// });

module.exports = connection;
