var router = require("express").Router();
var AuthUtils = require("../utils/auth");

/*
1. Implement a middleware to check JWT authentication
2. Check if a key is present in headers : x-web-logintoken
3. Throw a 401, if the token is missing
4. If token is present, check if it is valid or not.
5. If token is invalid, throw a 401
6. If token is valid, attach it in the request
7. Call next or next(er)
*/

router.use((req, _resp, next) => {
  try {
    authToken = req.headers["x-web-logintoken"];
    if (authToken) {
      decodedAuth = AuthUtils.validateToken(authToken);
      req.auth = decodedAuth;
      next();
    } else {
      e = new Error("Auth credentials missing in request.");
      e.status = 401;
      throw e;
    }
  } catch (e) {
    if (!e.status) e.status = 401;
    next(e);
  }
});

module.exports = router;
