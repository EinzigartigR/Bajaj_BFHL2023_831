const User = require('../models/user.model');
const List = require('../models/list.model');
require('dotenv').config();


exports.setItems = async function(req,res,next){
    const data = await List.create({
        taskName : req.body.taskName,
        status : req.body.status,
        username : req.body.username,
    })
    res.status(200).send({message:"item has been added to the list"})
}

exports.getListItems = async function(req,res,next){
    const data = await List.find().sort({
        createdAt : -1
    });
    res.send(data);
}

exports.deleteItem = async function(req,res){
    const data = await List.findOneAndDelete({username:req.body.username, taskName:req.body.taskName}).sort({createdAt: -1});
    res.status(200).send({message:"Item has been Removed"});
}

exports.updateItem = function(req,res){
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
    
        if(user.taskName == req.body.taskName){
           List.findOneAndUpdate({status: req.body.status}).sort({createdAt: -1});
            res.status(200).send({message:user.taskName + "'s Status has been Updated to " + user.status});
        }
    })

}