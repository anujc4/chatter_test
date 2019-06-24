var error = require("../utils/error_helper");
var jwt = require("../utils/auth_helper");
// 1. Write a middlware to check headers for a `X-Web-LoginToken`
// If the token is present, pass it to JWT to validate the token
// And attach the token payload to the request as an added `auth` attribute

// What do I need to check if this function works
// 1. req.auth contains the decoded value of the header
// 2. next() is getting invoked

// What do I need to check if this function throws an error
// 1. next(error) is getting invoked

exports.jwtHandler = function(req, resp, next) {
  authHeader = req.headers["x-web-logintoken"];
  if (authHeader) {
    try {
      auth = jwt.verify(authHeader);
      req.auth = auth;
      next();
    } catch (e) {
      next(error(e.message), {
        status: 401,
        userMessage: "Unable to validate user token"
      });
    }
  } else {
    next(
      error("Missing auth token", {
        status: 401,
        userMessage: "Invalid session. Please login."
      })
    );
  }
};
