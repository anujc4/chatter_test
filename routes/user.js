var router = require("express").Router();
var User = require("../db/models/user").User;
var GetUser = require("../utils/requestUtils").genericGet;
var validationResult = require("express-validator/check").validationResult;
var validator = require("express-validator/check");

var sendInternalServerError = function(res, er, userMessage = "Unable to process your request"){
  res.status(500).json({
    error: true,
    userMessage,
    errorMessage: er.message
  });
};

router.get("/", function(req, res){
  GetUser(req, User)
    .then(function(x) {
      res.json(x);
    })
    .catch(function(er) {
      sendInternalServerError(res, er);
    });
});

router.get("/:id", function(req, res) {
  User.find({_id: req.params.id}).limit(1).then(x => {
    res.json(x);
  }).catch(err => {
    sendInternalServerError(res, err);
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
      res.send(x.toJSON());
    })
    .catch(function(err) {
      sendInternalServerError(res, err);
    });
});

router.put("/", function(req, res) {});

router.delete("/", function(req, res) {});

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

