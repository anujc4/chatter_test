const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const moment = require("moment");
const logger = require("../config/winston");

const ConfigurationSchema = new Schema(
  {
    key: {
      type: String,
      require: true,
      unique: true,
      index: true
    },
    value: String
  },
  { timestamps: true }
);

ConfigurationSchema.plugin(uniqueValidator);

ConfigurationSchema.methods.toJSON = function() {
  value = "";
  try {
    value = JSON.parse(this.value);
  } catch (e) {
    logger.error(e);
    value = this.value;
  }
  return {
    id: this._id,
    key: this.key,
    value,
    createdAt: moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss"),
    updatedAt: moment(this.createdAt).format("DD/MM/YYYY HH:mm:ss")
  };
};

// ConfigurationSchema.methods.getConfiByKey = async function() {

// };
module.exports = mongoose.model("Configuration", ConfigurationSchema);
