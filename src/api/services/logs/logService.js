const { role } = require("../../../config/vars");
const httpStatus = require("http-status");
const fs = require("fs");
const moment = require("moment");

exports.getLogs = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED,
      response = { status: false, msg: "You don't have permission" };
    if (req.user.role == role.superAdmin) {
      const fiveMinutesAgo = moment().subtract(5, "minutes");
      response = fs
        .readFileSync("info.log", "utf8")
        .split("\n")
        .filter((log) => {
          const logTimestamp = moment(log.timestamp);
          return logTimestamp.isAfter(fiveMinutesAgo);
        });
      status = httpStatus.OK;
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};
