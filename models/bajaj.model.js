const mongoose = require("mongoose");

const data = mongoose.model(
  "Data",
  new mongoose.Schema({
    status: String,
    userid: String,
    college_email: String,
    college_roll: String,
    nums: String,
    alphas: String,
  })
);

module.exports = data;