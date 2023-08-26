const express = require("express");
const controller = require("./logController");
const { authorize } = require("../../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authorize(), controller.getLogs)

module.exports = router;
