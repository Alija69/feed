const { Joi } = require("express-validation");

module.exports = {
  createUser: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8).max(16),
      role: Joi.string().valid("super_admin", "admin", "basic").required(),
    }),
  },
};
