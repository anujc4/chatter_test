var mongoose = require("mongoose");
var crypto = require("crypto");
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
    lastName: String,
    password: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

encrypt = function(password) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");
};

// Takes a password and encrypts the value and assigns it to the object's
// password attribute
UserSchema.methods.setPassword = function(password) {
  this.password = encrypt(password);
  return this.password;
};

UserSchema.methods.validatePassword = function(password) {
  return this.password === encrypt(password);
};

UserSchema.plugin(uniqueValidator, {
  message: " is already taken."
});

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    firstName: this.firstName,
    password: this.password,
    lastName: this.lastName,
    createdAt: moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    updatedAt: moment(this.updatedAt).format("DD/MM/YYYY HH:mm:ss")
  };
};

exports.User = mongoose.model("User", UserSchema);
