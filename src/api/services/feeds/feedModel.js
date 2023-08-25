const Sequelize = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Feeds = sequelize.define(
  "feeds",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
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

module.exports = { Feeds };
