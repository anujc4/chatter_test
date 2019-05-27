var mongoose = require("mongoose");
db = mongoose.connect(process.env.DB_HOST);
var db = mongoose.connection;
db.once("open", function callback() {
  console.log("Connected to Mongo DB");
});
module.exports = mongoose;
