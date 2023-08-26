const service = require('./logService');

exports.getLogs = async (req, res, next) => {
  try {
    const {status,response} = await service.getLogs(req);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};
