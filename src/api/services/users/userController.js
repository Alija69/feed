const service = require('./userService');

exports.createUser = async (req, res, next) => {
  try {
    const {status,response} = await service.createUser(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const {status,response} = await service.getUser(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const {status,response} = await service.getUserById(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const {status,response} = await service.updateUser(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const {status,response} = await service.deleteUser(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

