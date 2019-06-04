require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.APP_PORT;
var userRouter = require("./routes/user");
var chatRouter = require("./routes/chat_history");
var indexRouter = require("./routes/index");

var errorHandler = require("./middleware/error_handler");
var path = require("path");
var mongoose = require("mongoose");

require("./db/mongo");

app.use(bodyParser.json());
// app.use(errorHandler);

app.use((req, _res, next) => {
  next();
});

// www.chatterapi.com/index
app.use("/index", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.all("/*", function(req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "error", "404.html"));
});

app.listen(port, function() {
  console.log("Chatter app listening on port ", port);
});
