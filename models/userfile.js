const mongoose = require("mongoose");

const UserFileSchema = mongoose.Schema({
  file_id: mongoose.Schema.Types.ObjectId,
  owner_id: String,
  content: String,
  pub_date: Date
});

module.exports = mongoose.model("UserFile", UserFileSchema);
