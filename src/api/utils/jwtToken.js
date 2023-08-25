const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpirationInterval } = require('../../config/vars');

exports.generateToken = async (data) => {
  try {
    return await jwt.sign(data, jwtSecret, {
      expiresIn: jwtExpirationInterval,
    });
  } catch (error) {
    throw error;
  }
};