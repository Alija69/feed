const { role } = require("../../../config/vars");
const { verifyPassword, makePassword } = require("../../utils/hashPassword");
const { generateToken } = require("../../utils/jwtToken");
const { Users } = require("./../users/userModel");
const httpStatus = require("http-status");

exports.login = async (req) => {
  try {
    let status=httpStatus.OK
    let response
    let user=await Users.findOne({where: { email: req.body.email}})
    if(!user){
        status=httpStatus.NOT_FOUND
        response={status:false,msg:'User not exist.'}
    }
    else if(user && !await verifyPassword(req.body.password,user.password)){
        status=httpStatus.BAD_REQUEST
        response={status:false,msg:'Incorrect passwword.'}
    }
    else{
        response={status:true,token:await generateToken({id:user.id,role:user.role,email:user.email})}
    }
    return { status, response };
  } catch (error) {
    throw error;
  }
};

exports.createSuperUser = async (req) => {
  try {
    let status = httpStatus.BAD_REQUEST;
    let response = { status:false,msg: "Super user exist." };
    let user = await Users.findOne({
      where: { role: role.superAdmin },
    });
    if (!user) {
      req.body.role=role.superAdmin
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