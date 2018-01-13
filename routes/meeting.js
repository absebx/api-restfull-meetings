'use strict'

var express = require('express');
//cargar controlador
var MeetingController = require('../controllers/meeting');
var api = express.Router();

api.get('/meetings', MeetingController.getMeetings);
api.get('/meeting/:id', MeetingController.getMeeting);
api.post('/meeting', MeetingController.saveMeeting);
api.put('/meeting/:id', MeetingController.updateMeeting);
api.delete('/meeting/:id', MeetingController.deleteMeeting);

module.exports = api;