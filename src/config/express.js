const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../api/routes/index");
const { logger } = require("./logger");
const moment = require("moment");
const fs = require("fs");

/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());

//log request response in info.log file
app.use((req, res, next) => {
  logger.log("info", `${req.body}`);
  let oldSend = res.send;
  res.send = function (data) {
    logger.log("info", `${JSON.parse(data)}`);
    oldSend.apply(res, arguments);
  };
  next();
});

// Auto delete old logs
setInterval(() => {
  const thirtyMinutesAgo = moment().subtract(30, "minutes");
  const logs = fs
    .readFileSync("info.log", "utf8")
    .split("\n")
    .filter((log) => {
      const logTimestamp = moment(log.timestamp);
      return logTimestamp.isAfter(thirtyMinutesAgo);
    });

  fs.writeFileSync("info.log", logs.join("\n"));
}, 5 * 60 * 1000);

// mount api v1 routes
app.use("/", routes);

module.exports = app;
