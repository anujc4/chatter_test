var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: String,
    firstName: String,
    lastName: String
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
