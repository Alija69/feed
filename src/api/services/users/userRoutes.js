const express = require("express");
const controller = require("./userController");
const { validate } = require("express-validation");
const { createUser } = require("./userValidation");
// const { authorize } = require('../../middleware/auth');

const router = express.Router();

router
  .route("/")
  .get(controller.getUser)
  .post(validate(createUser), controller.createUser);

router
  .route("/:id")
  .get(controller.getUserById)
  .put(validate(createUser),controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;
