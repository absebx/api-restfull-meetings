'use strict'

var express = require('express');
//cargar controlador
var TicketController = require('../controllers/ticket');
var api = express.Router();

api.get('/testticket', TicketController.test);
api.get('/tickets/:id?', TicketController.getTickets);
api.get('/ticket/:id', TicketController.getTicket);
api.post('/ticket', TicketController.saveTicket);
api.delete('/ticket/:id', TicketController.deleteTicket);
module.exports = api;6