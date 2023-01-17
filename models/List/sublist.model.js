const mongoose = require("mongoose");

const Sublist = mongoose.model(   //creating schema for list
  "Sublist",
  new mongoose.Schema({
    username: String,
    taskName: String,
    subtaskName: String,
    status: String,

  })
);

module.exports = Sublist;