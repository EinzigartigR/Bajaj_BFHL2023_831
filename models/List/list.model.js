const mongoose = require("mongoose");

const List = mongoose.model(   //creating schema for list
  "List",
  new mongoose.Schema({
    taskName: String,
    status: String,
    username: String,
    priority: String,
    deadline: Date,
  })
);

module.exports = List;