const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const indexRouter = require('./routes/index.routes');
const db = require("./models/index.model");
const app = express();
const bodyParser = require("body-parser");

(async () => {
  try {
    await mongoose.connect(process.env.mongodbUrl);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
})();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
