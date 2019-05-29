var mongoose = require("mongoose");
var moment = require("moment");
var uniqueValidator = require("mongoose-unique-validator");

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

UserSchema.plugin(uniqueValidator, {message: " is already taken."});

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    createdAt: moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    updatedAt: moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
  };
};

exports.User = mongoose.model("User", UserSchema);
