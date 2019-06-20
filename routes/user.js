var router = require("express").Router();
var User = require("../db/models/user").User;
var GetUser = require("../utils/requestUtils").genericGet;
var validationResult = require("express-validator/check").validationResult;
var validator = require("express-validator/check");
// var Error = require("../utils/responseUtils");
var error = require("../utils/error_helper");

router.get("/", function(req, res, next) {
  GetUser(req, User)
    .then(function(x) {
      res.json(x);
    })
    .catch(function(err) {
      next(err);
    });
});

router.get("/:id", function(req, res, next) {
  User.findOne({ _id: req.params.id })
    .then(user => {
      if (user) res.send(user);
      else
        throw error("Not found", {
          status: 404,
          userMessage: `${req.params.id} does not exist`
        });
    })
    .catch(err => {
      if (err.name === "CastError") {
        opts = {
          status: 400,
          userMessage: `${req.params.id} is an invalid input`,
          errorMessage: "Bad request"
        };
        return next(error(err.message, opts));
      }
      next(err);
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
    .trim()
];

// Promise based
router.post("/", rules, function(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user
    .save()
    .then(function(x) {
      res.send(x);
    })
    .catch(function(err) {
      next(err);
    });
});

// Async Await based
router.post("/", rules, async (req, res, next) => {
  try {
    var errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    next(err);
  }
});

/*
1. Check if the user exists
2. If yes, update the user
3. if no, send error back in API response
4. Once user is updated, send the updated user back in the API response
*/
router.put("/:id", async (req, res, next) => {
  try {
    updatedUserResp = await User.updateOne({ _id: req.params.id }, req.body);
    console.log("Updated user resp", JSON.stringify(updatedUserResp));
    if (updatedUserResp.n === 0)
      throw `User with ${req.params.id} does not exist.`;
    user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

/*
1. Delete the user from model
2. Done!
*/
router.delete("/:id", async (req, res, next) => {
  try {
    deleteResp = await User.deleteOne({ _id: req.params.id });
    res.send(deleteResp);
  } catch (e) {
    throw error(e.message);
  }
});

module.exports = router;

// app.get("/api/user_async", async function(req, res, next) {
//   console.log("Executing 2nd route");
//   try {
//     users = User.find().exec();
//     console.log(users);
//     res.json(users);
//   } catch (e) {
//     console.error("Unable to fetch users", e);
//     res.send("Unable to process request");
//   }
// });

// app.get("/api/user_promise", function(req, res, next) {
//   console.log("QUERY", req.query);

//   console.log("Executing 1st route");
//   User.find().then(function(x) {
//     res.json(x);
//   });
// });
