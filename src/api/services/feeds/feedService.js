const httpStatus = require("http-status");
const { Feeds } = require("./feedModel");

exports.getFeed = async (req) => {
  try {
    return {
      status: httpStatus.OK,
      response: await Feeds.findAll(),
    };
  } catch (error) {
    throw error;
  }
};

exports.getFeedById = async (req) => {
  try {
    return {
      status: httpStatus.OK,
      response: await Feeds.findByPk(req.params.id),
    };
  } catch (error) {
    throw error;
  }
};

exports.createFeed = async (req) => {
  try {
    await Feeds.create(req.body);
    return {
      status: httpStatus.CREATED,
      response: { status: true, msg: "Feed successfully created." },
    };
  } catch (error) {
    throw error;
  }
};

exports.updateFeed = async (req) => {
  try {
    await Feeds.update(req.body, {
      where: { id: req.params.id },
    });
    return {
      status: httpStatus.OK,
      response: { status: true, msg: "Feed successfully updated." },
    };
  } catch (error) {
    throw error;
  }
};

exports.deleteFeed = async (req) => {
  try {
    await Feeds.destroy({ where: { id: req.params.id } });
    return {
      status: httpStatus.OK,
      response: { status: true, msg: "Feed successfully deleted." },
    };
  } catch (error) {
    throw error;
  }
};
