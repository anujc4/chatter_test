require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.APP_PORT;

var authMiddleware = require("./middleware/authentication_handler");

var userAdminRouter = require("./routes/admin/user");
var userRouter = require("./routes/user");
var chatRouter = require("./routes/chat_history");
var indexRouter = require("./routes/index");

var path = require("path");

require("./db/mongo");

app.use(bodyParser.json());
// app.use(errorHandler);

app.use((req, _res, next) => {
  next();
});

app.use("/api/v1/chat", authMiddleware);

app.use("/index", indexRouter);
app.use("/api/v1/admin/user", userAdminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);

// app.use((err, _req, res, _next) => {
//   res.status(err.status).send(err.message);
// });

app.all("/*", function(req, res) {
  res.status(404).sendFile(path.join(__dirname, "public", "error", "404.html"));
});

app.listen(port, function() {
  console.log("Chatter app listening on port ", port);
});
