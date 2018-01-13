'use strict'

var express = require('express');
//cargar controlador
var MeetingController = require('../controllers/meeting');
var api = express.Router();

api.get('/meetings', MeetingController.getMeetings);

module.exports = api;