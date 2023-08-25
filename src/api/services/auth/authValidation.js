const { Joi } = require("express-validation");

module.exports = {
  login: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  createSuperUser: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required().min(8).max(16),
      name: Joi.string().required()
    }),
  },
};