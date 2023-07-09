const mySql = require('mysql');

const connection = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tj6JxCYk@$',
  database: 'CMS_DB'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to CMS database.');
});

module.exports = connection;
