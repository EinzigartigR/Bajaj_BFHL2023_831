const User = require('../models/user.model');

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const existingUsername = await User.findOne({ username: req.body.username }).exec();
    if (existingUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    const existingEmail = await User.findOne({ email: req.body.email }).exec();
    if (existingEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
