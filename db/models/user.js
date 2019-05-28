var mongoose = require("mongoose");
var moment = require("moment");

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: String,
    age: Number,
    firstName: String,
    lastName: String
  },
  { timestamps: true }
);

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
