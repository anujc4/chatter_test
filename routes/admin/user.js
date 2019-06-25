var router = require("express").Router();
var User = require("../../db/models/user").User;
var GetUser = require("../../utils/requestUtils").genericGet;
var validationResult = require("express-validator/check").validationResult;
var validator = require("express-validator/check");
var Error = require("../../utils/responseUtils");
var Redis = require("../../product/redis").client;

router.get("/", async function(req, res) {
  try {
    usersList = await Redis.getAsync("all_users");
    if (usersList) {
      res.json(JSON.parse(usersList));
    } else {
      dbUsers = await GetUser(req, User);
      Redis.setAsync("all_users", JSON.stringify(dbUsers));
      res.json(dbUsers);
    }
  } catch (e) {
    console.log(e);
    Error.sendInternalServerError(res, e);
  }
});

router.get("/:id", function(req, res) {
  User.find({ _id: req.params.id })
    .limit(1)
    .then(x => {
      // res.json(x);
      user = x.shift();
      if (user) res.send(user);
      else throw `User with ${req.params.id} does not exist.`;
    })
    .catch(err => {
      Error.sendNotFoundError(res, err);
    });
});

var rules = [
  validator
    .body("email")
    .isEmail()
    .normalizeEmail(),
  validator
    .body("firstName")
    .isAlpha()
    .trim(),
  validator
    .body("lastName")
    .isAlpha()
    .trim(),
  validator
    .body("username")
    .isLowercase()
    .trim(),
  validator
    .body("password")
    .not()
    .isEmpty(),
  validator.body("isAdmin").isBoolean()
];

// Promise based
router.post("/", rules, function(req, res) {
  console.log("Invoking POST Request");
  var errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  if (req.body.isAdmin) user.isAdmin = req.body.isAdmin;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.setPassword(req.body.password);

  user
    .save()
    .then(function(x) {
      res.send(x);
    })
    .catch(function(err) {
      Error.sendInternalServerError(res, err);
    });
});

/*
1. Check if the user exists
2. If yes, update the user
3. if no, send error back in API response
4. Once user is updated, send the updated user back in the API response
*/
router.put("/:id", async (req, res) => {
  try {
    updatedUserResp = await User.updateOne({ _id: req.params.id }, req.body);
    console.log("Updated user resp", JSON.stringify(updatedUserResp));
    if (updatedUserResp.n === 0)
      throw `User with ${req.params.id} does not exist.`;
    user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (e) {
    Error.sendNotFoundError(res, e);
  }
});

/*
1. Delete the user from model
2. Done!
*/
router.delete("/:id", async (req, res) => {
  try {
    deleteResp = await User.deleteOne({ _id: req.params.id });
    res.send(deleteResp);
  } catch (e) {
    Error.sendNotFoundError(res, e);
  }
});

module.exports = router;
