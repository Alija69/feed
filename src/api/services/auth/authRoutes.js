const express = require("express");
const controller = require("./authController");
const { validate } = require("express-validation");
const { login, createSuperUser } = require("./authValidation");

const router = express.Router();

router.route("/login").post(validate(login), controller.login);
router
  .route("/super_user")
  .post(validate(createSuperUser), controller.createSuperUser);

module.exports = router;
