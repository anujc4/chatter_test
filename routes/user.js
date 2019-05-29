var router = require("express").Router();
var User = require("../db/models/user").User;
var GetUser = require("../utils/requestUtils").genericGet;
var validationResult = require("express-validator/check").validationResult;
var validator = require("express-validator/check");
var Error = require("../utils/responseUtils");

router.get("/", function(req, res) {
  GetUser(req, User)
    .then(function(x) {
      res.json(x);
    })
    .catch(function(er) {
      Error.sendInternalServerError(res, er);
    });
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
    .trim()
];

// Promise based
router.post("/", rules, function(req, res) {
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
      Error.sendInternalServerError(res, err);
    });
});

// Async Await based
router.post("/", rules, async (req, res) => {
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
    Error.sendInternalServerError(res, err);
  }
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
  try{
    deleteResp = await User.deleteOne({_id: req.params.id});
    res.send(deleteResp);
  }catch(e){
    Error.sendNotFoundError(res, e);
  }
});

module.exports = router;

// app.get("/api/user_async", async function(req, res) {
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

// app.get("/api/user_promise", function(req, res) {
//   console.log("QUERY", req.query);

//   console.log("Executing 1st route");
//   User.find().then(function(x) {
//     res.json(x);
//   });
// });
