const mysql = require('mysql2'); //this is mysql2 for our db connection
require('dotenv').config(); //used for environment variables for secured data
const index = require('./index'); //this is our index.js file that contains our promptUser function

//we establish our connection to the database on the following lines
const connection = mysql.createConnection({ 
  host: 'localhost',
  user: process.env.DB_USER, //drived from .env file
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => { //this is where we connect to the database
  if (err) throw err;
  console.log('\n Connected to the CMS_DB database. \n'); //this is a message that will display in the console if we are connected to the database
  index.promptUser(connection); //this is where we call our promptUser function from our index.js file
});

module.exports = connection; //finally we export our connection to be used in other files
