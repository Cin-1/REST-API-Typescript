import { now } from "mongoose";
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true },
    emails: { type: Array, required: true, lowercase: true, trim: true },
    phones: { type: Array, required: false, trim: true },
    birthday: { type: Date, required: false, trim: true },
    password: { type: String, required: true, trim: true },
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
