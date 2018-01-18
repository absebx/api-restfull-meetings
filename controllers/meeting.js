'use strict'

var Meeting = require('../models/meeting');
var Ticket = require('../models/ticket');

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

// function getMeeting(req, res){
//   var meetingId = req.params.id;
//   Meeting.findById(meetingId, (err, meeting)=>{
//     if(err){
//       res.status(500).send({message: "internal server error"});
//     }else{
//       if(!meeting){
//         res.status(404).send({message: "meeting not found"});
//       }else{
//         //meeting with tickets
//         Ticket.populate(meeting, {path: 'tickets'}, (err, meeting)=>{
//           if(err){
//             res.status(500).send({message: "Internal server error"});
//           }else{
//             res.status(200).send({meeting: meeting});
//           }
//         })
//         // res.status(200).send({meeting: meeting});
//       }
//     }
//   });
// }

function getMeeting(req, res){
  var meetingId = req.params.id;
  Meeting
    .findById(meetingId)
    .populate('tickets')
    .exec((err,meeting)=>{
      if(err){
        res.status(500).send({message: "Internal server error"});
      }else{
        if(!meeting){
          res.status(404).send({message: "Meeting not found"});
        }else{
          res.status(200).send({meeting: meeting});
        }
      }
    });
}

function saveMeeting(req, res){
  var meeting = new Meeting();
  var params = req.body;
  meeting.name = params.name;
  meeting.description = params.description;
  meeting.save((err, meetingStored)=>{
    if(err || !meetingStored){
      res.status(500).send({message: "Internal server error"});
    }else{
      res.status(200).send({meeting: meetingStored});
    }
  });
}

function updateMeeting(req, res){
  var meetingId = req.params.id;
  var update = req.body;
  Meeting.findByIdAndUpdate(meetingId, update, (err,meetingUpdated)=>{
    if(err){
      res.status(500).send({message: "Internal server error"});
    }else{
      if(!meetingUpdated){
        res.status(404).send({message: "meeting not found"});
      }else{
        res.status(200).send({meeting: meetingUpdated});
      }
    }
  });
}

function deleteMeeting(req, res){
  var meetingId = req.params.id;
  Meeting.findByIdAndRemove(meetingId, (err,meetingDeleted)=>{
    if(err){
      res.status(500).send({message: "internal server error"});
    }else{
      if(!meetingDeleted){
        res.status(404).send({message: "Meeting not found"});
      }else{
        res.status(200).send({meeting: meetingDeleted});
      }
    }
  });
}

module.exports = {
  getMeetings,
  getMeeting,
  saveMeeting,
  updateMeeting,
  deleteMeeting
}