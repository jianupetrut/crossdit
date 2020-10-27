const mongoose = require("mongoose");

const UserFileSchema = mongoose.Schema({
  file_id: mongoose.Schema.Types.ObjectId,
  owner_id: String,
  content: String,
  location : String,
  filetype : String,
  created_date : Date,
  size : Number,
  modified_date : Date
});

module.exports = mongoose.model("UserFile", UserFileSchema);
