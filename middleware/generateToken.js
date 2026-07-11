const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h"
  });
}

module.exports = generateToken;