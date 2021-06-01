import { now } from "mongoose";
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    emails: { type: Array, required: true },
    phones: { type: Array, required: false },
    birthday: { type: Date, required: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

var User = mongoose.model("User", userSchema);

module.exports = User;
