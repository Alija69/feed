const express = require("express");
const controller = require("./feedController");
const { validate } = require("express-validation");
const { createFeed } = require("./feedValidation");
// const { authorize } = require('../../middleware/auth');

const router = express.Router();

router
  .route("/")
  .get(controller.getFeed)
  .post(validate(createFeed), controller.createFeed);

router
  .route("/:id")
  .get(controller.getFeedById)
  .put(controller.updateFeed)
  .delete(controller.deleteFeed);

module.exports = router;
