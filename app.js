require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.APP_PORT;
var userRouter = require("./routes/user");
var chatRouter = require("./routes/chat_history");
var path = require("path");

require("./db/mongo");

app.use(bodyParser.json());

// TODO ASSIGNMENT
app.use((req, _res, next) => {
  // TODO Log the following here
  // console.log("Started GET/POST/PUT/DELETE <url> <JSON.stringify(body)>")
  // console.log("Executing some API");
  next();
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.all("/*", function(req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "error", "404.html"));
});

app.listen(port, function() {
  console.log("Example app listening on port ", port);
});
