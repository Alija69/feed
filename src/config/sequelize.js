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

const superUser = {
  name: "Super Admin",
  role: "super_admin",
  email: "super@admin.com",
  password: "super@password",
};

sequelize
  .query(`select COUNT(*) AS count from users where role='super_admin'`, {
    type: Sequelize.QueryTypes.SELECT,
  })
  .then((results) => {
    console.log('Number of super admin is '+results[0].count)
    if (!results[0].count) {
      const insertQuery = ` INSERT INTO users (role, name, email, password) VALUES (:role, :name, :email, :password) `;
      sequelize
        .query(insertQuery, {
          replacements: superUser,
          type: Sequelize.QueryTypes.INSERT,
        })
        .then((result) => {
          console.log("Super admin inserted:", result);
        })
        .catch((error) => {
          console.error("Error inserting user:", error);
        })
    }
  });

module.exports = sequelize;
