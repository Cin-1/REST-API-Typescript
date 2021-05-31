let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  emails: { type: Array, required: false },
  phones: { type: Array, required: false },
  updatedAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false },
  birthday: { type: Date, required: false },
  password: { type: String, required: false },
});

var User = mongoose.model("User", userSchema);

module.exports = User;
