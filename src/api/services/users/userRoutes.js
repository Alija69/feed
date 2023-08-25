const express = require("express");
const controller = require("./userController");
const { validate } = require("express-validation");
const { createUser, updateUser } = require("./userValidation");
const { authorize } = require("../../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authorize(), controller.getUser)
  .post(authorize(), validate(createUser), controller.createUser);

router
  .route("/:id")
  .get(authorize(), controller.getUserById)
  .put(authorize(), validate(updateUser), controller.updateUser)
  .delete(authorize(), controller.deleteUser);

module.exports = router;
