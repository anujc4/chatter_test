var router = require("express").Router();

// router.get("/", (req, resp, next) => {
//   console.log("Hitting Route 1");
//   er = new Error('Route 1 faced error');
//   next(er);
// });

router.get("/", (req, resp, next) => {
  resp.send("Welcome to chatter API");
});

module.exports = router;
