const mongoose = require("mongoose");

const List = mongoose.model(   //creating schema for list
  "List",
  new mongoose.Schema({
    seq: String,
    name: String,
    status: String,
  })
);

module.exports = List;