const { Sequelize } = require("sequelize");
require('dotenv').config()

const mysqlConnection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    // logging: (...msg) => console.log(msg),
})

module.exports = mysqlConnection