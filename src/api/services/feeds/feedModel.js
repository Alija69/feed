const Sequelize = require("sequelize");
const sequelize = require("../../../config/sequelize");
const { Users } = require("../users/userModel");

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

const UserFeedPermission = sequelize.define(
  "user_feed_permission",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field:'user_id'
    },
    feed_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'feeds',
        key: 'id'
      },
      field:'feed_id'
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
    tableName: 'user_feed_permission',
  }
);

Feeds.hasMany(UserFeedPermission, {
  foreignKey: 'feed_id',
});

module.exports = { Feeds,UserFeedPermission };
