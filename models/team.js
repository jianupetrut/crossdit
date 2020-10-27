const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  members_id: Array,
  cotwo_total : Number,
  cotwo_weeky : Number
});

module.exports = mongoose.model("Team", TeamSchema);
