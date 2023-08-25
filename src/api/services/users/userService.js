const { role } = require("../../../config/vars");
const { makePassword } = require("../../utils/hashPassword");
const { Users } = require("./userModel");

const httpStatus = require("http-status");

exports.getUser = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED;
    let response = { msg: "You don't have Permission." };
    if (req.user.role == role.superAdmin) {
      status = httpStatus.OK;
      response = await Users.findAll({
        attributes: { exclude: ["password"] },
      });
    } else if (req.user.role == role.admin) {
      status = httpStatus.OK;
      response = await Users.findAll({
        attributes: { exclude: ["password"] },
        where: { role: role.basic },
      });
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (req) => {
  try {
    let status = httpStatus.UNAUTHORIZED;
    let response = { msg: "You don't have Permission." };
    if (req.user.role == role.superAdmin) {
      status = httpStatus.OK;
      response = await Users.findOne({
        attributes: { exclude: ["password"] },
        where: { id: req.params.id },
      });
    } else if (req.user.role == role.admin) {
      status = httpStatus.OK;
      response = await Users.findOne({
        attributes: { exclude: ["password"] },
        where: { role: role.basic, id: req.params.id },
      });
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (req) => {
  try {
    let flag = false;
    let status = httpStatus.UNAUTHORIZED;
    let response = { status: false, msg: "You don't have permission." };
    if (req.user.role == role.superAdmin && req.body.role != role.superAdmin) {
      flag = true;
    } else if (req.user.role == role.admin && req.body.role == role.basic) {
      flag = true;
    }
    if (flag) {
      req.body.password = await makePassword(req.body.password);
      await Users.create(req.body);
      status = httpStatus.CREATED;
      response = { status: true, msg: "User successfully created." };
    }
    return { status, response };
  } catch (error) {
    return {
      status: httpStatus.BAD_REQUEST,
      response: { status: false, msg: error.errors[0].message },
    };
  }
};

exports.updateUser = async (req) => {
  try {
    let update = await Users.findOne({
      where: { id: req.params.id },
    });

    let flag = false;
    let status = httpStatus.UNAUTHORIZED;
    let response = { status: false, msg: "You don't have permission." };
    if (req.user.role == role.superAdmin) {
      flag = true;
    }
    if (flag) {
      update.role = req.body.role;
      update.save();
      status = httpStatus.OK;
      response = { status: true, msg: "User successfully updated." };
    }
    return { status, response };
  } catch (error) {
    return {
      status: httpStatus.BAD_REQUEST,
      response: { status: false, msg: error.errors[0].message },
    };
  }
};

exports.deleteUser = async (req) => {
  try {
    let user = await Users.findOne({
      where: { id: req.params.id },
    });
    let flag = false;
    let status = httpStatus.UNAUTHORIZED;
    let response = { status: false, msg: "You don't have permission." };
    if (user && user.role!==role.superAdmin && req.user.role == role.superAdmin ) {
      flag = true;
    } else if (user && user.role == role.basic && req.user.role == role.admin ) {
      flag = true;
    }
    if (flag) {
      user.destroy();
      status = httpStatus.OK;
      response = { status: true, msg: "User successfully deleted." };
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};
