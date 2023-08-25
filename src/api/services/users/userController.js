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

// exports.deleteEducation = async (req, res, next) => {
//   try {
//     const id = req.params['id'];
//     const headers = req.headers;
//     const host = req.get('host');
//     const response = await service.deleteEducation(id, headers, host);
//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.userEducation = async (req, res, next) => {
//   try {
//     const headers = req.headers;
//     const host = req.get('host');
//     const response = await service.userEducation(headers, host);
//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// };

