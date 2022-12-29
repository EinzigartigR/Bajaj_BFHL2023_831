const List = require('../models/list.model');
require('dotenv').config();


exports.setItems = async function(req,res){
    const list = await List.create({
        taskName : req.body.taskName,
        status : req.body.status,
        username : req.body.username,
    }, (err)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send({message:"item has been added to the list"})   
    })
}

exports.getListItems = async function(req,res){
    const data = await List.find().sort({
        createdAt : -1
    }, (err,list) => {
        if(err){
            res.status(500).send(err);
        }
        if(!list){
            res.status(401).send({message:"No list has been made"});
        }

        res.send(data);
    });

}

exports.deleteItem = async function(req,res){
    const data = await List.findOneAndDelete({username:req.body.username, taskName:req.body.taskName}, (err,user)=>{
        if(err){
            res.status(500).send(err);
        }
        if(!user){
            res.status(401).send({message:"User with this task does not exist"});
        }
        res.status(200).send({message:"Item has been Removed"});
    })
}

exports.updateItem = function(req,res){
 List.findOneAndUpdate({username: req.body.username , taskName: req.body.taskName},{$set : {status:req.body.status}}, (err,user) => {
    if(err){
        res.status(500).send(err);
    }

    if(!user){
        res.status(401).send({message:"User with this task does not exist"});
    }
    res.status(200).send({message:req.body.taskName + " has been Updated"});
 })

}