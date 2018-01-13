'use strict'

var Meeting = require('../models/meeting');

function getMeetings(req, res){
  Meeting.find({}, (err,meetings)=>{
    if(err){
      res.status(500).send({message: "internal server error"});
    }else{
      if(!meetings){
        res.status(404).send({message: "There are not meetings"});
      }else{
        res.status(200).send({meetings: meetings});
      }
    }
  })
}

module.exports = {
  getMeetings
}