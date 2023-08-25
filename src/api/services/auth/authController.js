const service = require('./authService');

exports.login = async (req, res, next) => {
  try {
    const {status,response} = await service.login(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.createSuperUser = async (req, res, next) => {
  try {
    const {status,response} = await service.createSuperUser(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};