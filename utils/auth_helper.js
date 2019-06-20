var jwt = require("jsonwebtoken");

const SIGNING_KEY = "e8b655afd04f49ea883e34263a66c966";
const EXPIRY = "2d";

exports.sign = function(payload) {
  return jwt.sign(payload, SIGNING_KEY, {
    expiresIn: EXPIRY
  });
};

exports.verify = function(payload) {
  return jwt.verify(payload, SIGNING_KEY);
};
