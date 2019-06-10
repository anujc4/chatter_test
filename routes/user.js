var router = require("express").Router();
var validationResult = require("express-validator/check").validationResult;
var validator = require("express-validator/check");
var User = require("../db/models/user").User;
var Auth = require("../utils/auth");

var rules = [
  validator
    .body("email")
    .isEmail()
    .normalizeEmail(),
  validator
    .body("password")
    .not()
    .isEmpty()
];

/*
1. Check if the email and password is present or not
2. Check in `User` document if there is a user with the requested email
3. If user is not present, send error back to client with "Invalid email"
4. If user is present, check if the password is valid
5. If password is invalid, send error to client with "Invalid password"
6. If password is valid, send correct response to client
*/

router.post("/login", rules, async (req, resp, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    var user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.validatePassword(req.body.password)) {
        token = Auth.generateToken({
          id: user._id,
          email: user.email
        });
        return resp.send({
          username: user.username
          , email: user.email
          , firstName: user.firstName
          , lastName: user.lastName
          , token
        });
      } else {
        e = new Error("Invalid password. Please try again");
        e.status = 401;
        throw e;
      }
    } else {
      e = new Error("Invalid email. Does not exist.");
      e.status = 401;
      throw e;
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
