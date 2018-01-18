'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MeetingSchema = Schema({
  name: String,
  description: String,
  tickets: [{type: Schema.ObjectId, ref: 'Ticket'}]
});
module.exports = mongoose.model('Meetings', MeetingSchema);