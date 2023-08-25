const express = require("express");
const controller = require("./feedController");
const { validate } = require("express-validation");
const { createFeed,userFeedPermission } = require("./feedValidation");
const { authorize } = require("../../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authorize(), controller.getFeed)
  .post(authorize(), validate(createFeed), controller.createFeed);

router
  .route("/:id")
  .get(authorize(), controller.getFeedById)
  .put(authorize(), validate(createFeed), controller.updateFeed)
  .delete(authorize(), controller.deleteFeed);

router
  .route("/give_access")
  .post(authorize(), validate(userFeedPermission), controller.userFeedPermission);

module.exports = router;
