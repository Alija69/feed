const { role } = require("../../../config/vars");
const { makePassword } = require("../../utils/hashPassword");
const { Users } = require("./userModel");


const httpStatus = require("http-status");

exports.getUser = async (req) => {
  try {
    return {
      status: httpStatus.OK,
      response: await Users.findAll({attributes:{exclude:['password']}}),
    };
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (req) => {
  try {
    return {
      status: httpStatus.OK,
      response: await Users.findOne({attributes:{exclude:['password']},where: { id: req.params.id}}),
    };
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (req) => {
  try {
    req.body.password= await makePassword(req.body.password)
    console.log(req.body)
    await Users.create(req.body);
    return {
      status: httpStatus.CREATED,
      response: { status: true, msg: "User successfully created." },
    };
  } catch (error) {
    return {
      status: httpStatus.BAD_REQUEST,
      response: { status: false, msg: error.errors[0].message },
    };
  }
};

exports.updateUser = async (req) => {
  try {
    let status=httpStatus.BAD_REQUEST
    let response={status:false,msg:'not updated.'}
    let update = await Users.update(req.body, {
      where: { id: req.params.id,email:req.body.email },
    });
    if(update[0]){
      status=httpStatus.OK
      response.status=true
      response.msg="User successfully updated."
    }
    return { status ,response };
  } catch (error) {
    return {
      status: httpStatus.BAD_REQUEST,
      response: { status: false, msg: error.errors[0].message },
    };
  }
};

exports.deleteUser = async (req) => {
  try {
    let status=httpStatus.BAD_REQUEST
    let response={status:false,msg:'not deleted.'}
    let deleted=await Users.destroy({ where: { id: req.params.id } });
    console.log(deleted)
    if(deleted){
      status=httpStatus.OK
      response.status=true
      response.msg='Deleted successfully.'
    }
    return { status ,response };
  } catch (error) {
    throw error;
  }
};