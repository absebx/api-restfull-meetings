'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TicketSchema = Schema({
  name: String,
  check: Boolean,
  meeting: {type: Schema.ObjectId, ref: 'Meeting'}
});
module.exports = mongoose.model('Tickets', TicketSchema);