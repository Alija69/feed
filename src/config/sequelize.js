const Sequelize = require("sequelize");

const { mysqlHost, mysqlDatabase, mysqlPassword, mysqlUser, mysqlPort, } = require("./vars");

const sequelize = new Sequelize(mysqlDatabase, mysqlUser, mysqlPassword, {
  host: mysqlHost,
  dialect: "mysql",
  port: mysqlPort,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
