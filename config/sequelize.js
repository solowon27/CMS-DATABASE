const Sequelize = require('sequelize');
require('dotenv').config();
const server = require('./server.js');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
);

module.exports = sequelize;
