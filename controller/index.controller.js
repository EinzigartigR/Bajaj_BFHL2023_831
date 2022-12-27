const User = require('../models/user.model');
const List = require('../models/list.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signUp = async function(req,res,next){
    const user = await new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
    })
    user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
        }
        res.send({ message: "User was registered successfully!" });
      });
}

exports.signIn = (req,res) => {
    User.findOne({
        username:req.body.username
    }).exec((err,user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!user){
            res.status(404).send({ message: 'User Not Found' });
            return;
        }
        var isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordValid){
            return res.status(401).send({message:'Password Incorrect'});
        }
        var token = jwt.sign({id:user._id},process.env.secret,{
            expiresIn:86400 //24hr
        })
        res.status(200).send({
            id:user._id, user:user.username, email:user.email, access_token:token
        });
    })

}

exports.getAllUsers = async function(req,res,next){
    const data = await User.find().sort({
        createdAt : -1
    });
    res.send(data);
}

exports.setItems = async function(req,res,next){
    const data = await List.create({
        seq : req.body.seq,
        name : req.body.name,
        status : req.body.status,
    })
    res.status(200).send({message:"item has been added to the list"})
}

exports.getListItems = async function(req,res,next){
    const data = await List.find().sort({
        createdAt : -1
    });
    res.send(data);
}