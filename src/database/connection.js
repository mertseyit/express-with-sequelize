const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' });
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mariadb', // whatever you want database type
    port: 3306,
    logging: false
  }
);

module.exports = sequelize;
