const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Bajaj = require('../models/bajaj.model');
require('dotenv').config();

exports.signUp = async function (req, res) {
  try {
      const user = new User({
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: bcrypt.hashSync(req.body.password, 8),
      });

      await user.save();
      res.send({ message: "User was registered successfully!" });
  } catch (err) {
      res.status(500).send({ message: err });
  }
}

exports.signIn = (req, res) => {
    var token = jwt.sign({ id: req.body.username }, process.env.secret, {
        expiresIn: 86400 //24hr
    })
    res.status(200).send({
        user: req.body.username, access_token: token
    });

}

exports.add_data = async function(req,res){
    const bajaj = await new Bajaj({
        status: req.body.status,
    userid: req.body.userid,
    college_email: req.body.college_email,
    college_roll: req.body.college_roll,
    nums: req.body.nums,
    alphas: req.body.alphas,
    })
    bajaj.save(err => {
        if (err) {
          res.status(500).send({ message: err });
        }
        res.send({ message: "Ananya was registered successfully!" });
      });
}

exports.get_data = async function(req, res) {
    try {
      const data = await List.find();
      if (data.length === 0) {
        return res.status(401).send({ message: "No list has been made" });
      }
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  
