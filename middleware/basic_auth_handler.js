var router = require("express").Router();
var Utils = require("../utils/utils");
var User = require("../db/models/user").User;
/*
STEPS FOR IMPLEMENTATION
1. Check the headers for auth key :: req.headers.authorization
2. If auth is not present, throw an error
3. if auth is present, it should be in a specifc format = Basic base64(<Username:password>)
  3.1. replace("Basic", "");
  3.2 decodeBase64 -> username:password
  3.3 split(":")
4. Check if the user exists in the database
5. if not, throw an error
6. If present, call next();
*/

router.use(async (req, resp, next) => {
  try {
    authToken = req.headers.authorization;
    if (authToken) {
      encodedToken = authToken.replace("Basic ", "");
      decodedToken = Utils.decodeBase64(encodedToken);
      credentialsTuple = decodedToken.split(":");
      if (credentialsTuple.length === 2) {
        user = await new User().validateUser(
          credentialsTuple.shift(),
          credentialsTuple.shift()
        );
        req.user = user;
        next();
      } else {
        e = new Error("Auth details missing username or password");
        e.status = 401;
        throw e;
      }
    } else {
      e = new Error("Auth details missing in headers");
      e.status = 401;
      throw e;
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
