const jwt = require("jsonwebtoken");

const SIGNING_KEY = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "2d";

const generateToken = function(payload) {
  return jwt.sign(payload, SIGNING_KEY, {
    expiresIn: JWT_EXPIRY
  });
};

const validateToken = function(token) {
  return jwt.verify(token, SIGNING_KEY);
};

module.exports = {generateToken, validateToken};