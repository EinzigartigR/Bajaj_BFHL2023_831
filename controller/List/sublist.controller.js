const Sublist = require('../../models/List/sublist.model');
require('dotenv').config();


exports.setSubItems = async function(req,res){
    const sublist = await Sublist.create({
        username : req.body.username,
        taskName : req.body.taskName,
        subtaskName : req.body.subtaskName,
        status : req.body.status,

    }, (err)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send({message:"item has been added to the list"})   
    })
}

exports.getSublistItems = async function(req,res){
    const data = await Sublist.find().sort({
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

exports.deleteSublistItem = async function(req,res){
    const data = await Sublist.findOneAndDelete({username:req.body.username, taskName:req.body.taskName , subtaskName: req.body.subtaskName}, (err,user)=>{
        if(err){
            res.status(500).send(err);
        }
        if(!user){
            res.status(401).send({message:"User with this task does not exist"});
        }
        res.status(200).send({message:"Item has been Removed"});
    })
}

exports.updateSubslistStatus = function(req,res){
 List.findOneAndUpdate({username: req.body.username , taskName: req.body.taskName , subtaskName: req.body.subtaskName},{$set : {status:req.body.status}}, (err,user) => {
    if(err){
        res.status(500).send(err);
    }

    if(!user){
        res.status(401).send({message:"User with this task does not exist"});
    }
    res.status(200).send({message:req.body.taskName + " has been Updated"});
 })

}