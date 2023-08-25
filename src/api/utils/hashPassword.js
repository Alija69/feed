const crypto = require('crypto');

const algorithm = 'pbkdf2_sha256';
const iterations = 150000;
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function encode(password, salt) {
  let encoded = crypto
    .pbkdf2Sync(password, salt, iterations, 32, 'sha256')
    .toString('base64');
  encoded = [algorithm, iterations, salt, encoded].join('$');
  return encoded;
}

async function makePassword(password) {
  var salt = generateString(12);
  return encode(password, salt);
}

function verifyPassword(password, encoded) {
  let salt = encoded ? encoded.split('$')[2] : '';
  let encoded1 = encode(password, salt);
  return encoded1 == encoded;
}

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { makePassword, verifyPassword };
