const service = require('./feedService');

exports.getFeed = async (req, res, next) => {
    try {
      const {status,response} = await service.getFeed(req);
      res.status(status).json(response);
    } catch (error) {
      next(error);
    }
  };

  exports.getFeedById = async (req, res, next) => {
    try {
      const {status,response} = await service.getFeedById(req);
      res.status(status).json(response);
    } catch (error) {
      next(error);
    }
  };

exports.createFeed = async (req, res, next) => {
  try {
    const {status,response} = await service.createFeed(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateFeed = async (req, res, next) => {
  try {
    const  {status,response} = await service.updateFeed(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteFeed = async (req, res, next) => {
  try {
    const  {status,response} = await service.deleteFeed(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};