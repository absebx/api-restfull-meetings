'use strict'
var Ticket = require('../models/ticket');
var Meeting = require('../models/meeting');

function test(req, res){
  res.status(200).send({message: 'TicketController working'});
}

function getTicket(req, res){
  var ticketId = req.params.id;
  Ticket.findById(ticketId, (err,ticket)=>{
    if(err){
      res.status(500).send({message: "Internal server error"});
    }else{
      if(!ticket){
        res.status(404).send({message: "ticket not found"});
      }else{
        //obtener meeting a la que pertenece
        Meeting.populate(ticket, {path: 'meeting'}, (err, ticket)=>{
          if(err){
            res.status(500).send({message: "Internal server error"});
          }else{
            res.status(200).send({ticket});
          }
        });
      }
    }
  });
}

// function getTicket(req, res){
//   var ticketId = req.params.id;
//   Ticket
//     .findById(ticketId)
//     .populate('meeting')
//     .exec((err,ticket)=>{
//       if(err){
//         res.status(500).send({message: "internal server error"});
//       }else{
//         if(!ticket){
//           res.status(404).send({message: "Ticket not found"});
//         }else{
//           res.status(200).send({ticket: ticket});
//         }
//       }
//     });
// }

function saveTicket(req, res){
  var ticket = new Ticket();
  var params = req.body;
  ticket.name = params.name;
  ticket.check = params.check;
  ticket.meeting = params.meeting;

  ticket.save((err, ticketStored)=>{
    if(err){
      res.status(500).send({message: "internal server error"});
    }else{
      if(!ticketStored){
        res.status(404).send({message: "Ticket not found"});
      }else{
        res.status(200).send({ticket: ticketStored});
      }
    }
  });
}

function deleteTicket(req, res){
  var ticketId = req.params.id;
  Ticket.findByIdAndRemove(ticketId, (err,ticketDeleted)=>{
    if(err){
      res.status(500).send({messaje: "Internal server error"});
    }else{
      if(!ticketDeleted){
        res.status(404).send({messaje: "ticket not found"});
      }else{
        res.status(200).send({ticket: ticketDeleted});
      }
    }
  })
}

function getTickets (req, res){
  var meetingId = req.params.id;
  var find;
  if(!meetingId){
    find = Ticket.find({});
  }else{
    find = Ticket.find({meeting: meetingId})
  }
  find.sort().exec((err,tickets)=>{
    if(err){
      res.status(500).send({message: 'Internal server error'})
    }else{
      if(!tickets){
        res.status(404).send({message: 'Not found tickets'})
      }else{
        res.status(200).send({tickets});
      }
    }
  });
}

module.exports = {
  test,
  getTicket,
  saveTicket,
  deleteTicket,
  getTickets
}