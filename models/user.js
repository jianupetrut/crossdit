const { Int32 } = require("bson");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  pw_hash: String,
  files : Array,
  cotwo_weekly : Number,
  cotwo_total : Number,
  team_id : String
});

module.exports = mongoose.model("User", UserSchema);
