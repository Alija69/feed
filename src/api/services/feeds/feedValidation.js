const { Joi } = require("express-validation");

module.exports = {
  createFeed: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      url: Joi.string().required(),
    }),
  },
};
