const mongoose = require("mongoose");

const UserFileSchema = mongoose.Schema({
  owner_id: String,
  filename: String,
  content: String,
  location : String,
  filetype : String,
  created_date : Date,
  size : Number,
  modified_date : Date
});

module.exports = mongoose.model("UserFile", UserFileSchema);
