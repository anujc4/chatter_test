require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.APP_PORT;
var userRouter = require("./routes/user");
var path = require("path");

require("./db/mongo");

app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.all("/*", function(req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "error", "404.html"));
});

app.listen(port, function() {
  console.log("Example app listening on port ", port);
});
