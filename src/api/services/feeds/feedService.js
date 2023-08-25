const httpStatus = require("http-status");
const { Feeds, UserFeedPermission } = require("./feedModel");
const { role } = require("../../../config/vars");
const { Users } = require("../users/userModel");

exports.getFeed = async (req) => {
  try {
    let feeds;
    if (req.user.role == role.admin || req.user.role == role.basic) {
      feeds = await Feeds.findAll({
        include: [
          {
            attributes: [],
            model: UserFeedPermission,
            where: { user_id: req.user.id },
          },
        ],
      });
    } else {
      feeds = await Feeds.findAll();
    }
    return {
      status: httpStatus.OK,
      response: feeds,
    };
  } catch (error) {
    throw error;
  }
};

exports.getFeedById = async (req) => {
  try {
    let feeds;
    if (req.user.role == role.admin || req.user.role == role.basic) {
      feeds = await Feeds.findOne({
        where: { id: req.params.id },
        include: [
          {
            attributes: [],
            model: UserFeedPermission,
            where: { user_id: req.user.id },
          },
        ],
      });
    } else {
      feeds = await Feeds.findByPk(req.params.id);
    }
    return {
      status: httpStatus.OK,
      response: feeds,
    };
  } catch (error) {
    throw error;
  }
};

exports.createFeed = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED,
      response = { status: false, msg: "You don't have permission" };
    if (req.user.role == role.superAdmin) {
      await Feeds.create(req.body);
      status = httpStatus.CREATED;
      response = { status: true, msg: "Feed successfully created." };
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

exports.updateFeed = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED,
      response = { status: false, msg: "You don't have permission" };
    if (req.user.role == role.superAdmin) {
      await Feeds.update(req.body, {
        where: { id: req.params.id },
      });
      status = httpStatus.OK;
      response = { status: true, msg: "Feed successfully updated." };
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

exports.deleteFeed = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED,
      response = { status: false, msg: "You don't have permission" };
    if (req.user.role == role.superAdmin) {
      await Feeds.destroy({ where: { id: req.params.id } });
      status = httpStatus.OK;
      response = { status: true, msg: "Feed successfully deleted." };
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

exports.userFeedPermission = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED;
    let response = { status: false, msg: "You don't have permission" };
    let flag = false;
    if (req.user.role == role.superAdmin) {
      flag = true;
    } else if (req.user.role == role.admin) {
      let feeds = await UserFeedPermission.findAll({
        attributes: ["feed_id"],
        where: { user_id: req.user.id },
      });
      let feedsId = feeds.map((feed) => feed.feed_id);
      if (feedsId.includes(req.body.feed_id)) {
        let user = await Users.findByPk(req.body.user_id);
        flag = user ? user.role == role.basic : false;
      }
    }
    if (flag && (await isValid(req.body))) {
      await UserFeedPermission.create(req.body);
      status = httpStatus.OK;
      response = { status: true, msg: "Feed access successfully provided." };
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

async function isValid({ user_id, feed_id }) {
  return (await Users.findByPk(user_id)) && (await Feeds.findByPk(feed_id));
}
