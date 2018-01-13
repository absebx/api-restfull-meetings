'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MeetingSchema = Schema({
  name: String,
  description: String
});
module.exports = mongoose.model('Meetings', MeetingSchema);