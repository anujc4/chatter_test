var router = require("express").Router();
var User = require("../db/models/user").User;

var sendInternalServerError = function(res, er, userMessage = "Unable to process your request"){
  res.status(500).json({
    error: true,
    userMessage,
    errorMessage: er.message
  });
};

router.get("/", function(req, res){
  User.find().then(function(x) {
    throw "Some error";
    res.json(x);
  }).catch(function(er){
    sendInternalServerError(res, er);
  });
});

router.get("/:id", function(req, res) {
  User.find();
});

router.post("/", function(req, res) {});

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

