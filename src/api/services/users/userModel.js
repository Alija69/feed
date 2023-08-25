const Sequelize = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: Sequelize.ENUM("super_admin", "admin", "basic"),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      default: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      default: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Users };
