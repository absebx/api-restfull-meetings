'use strict'
var mongoose = require('mongoose');

var app = require('./app');

var port = process.env.port || 4500;
var dbLocal = 'mongodb://localhost:27017/app_meetings';
var dbmLab = 'mongodb://abner:asder24682468@ds117888.mlab.com:17888/app_meetings';
mongoose.connect(dbmLab, (err, res)=>{
  if(err){
    throw err;
  }else{
    app.listen(port, ()=>{
      console.log("Api lisening in port:"+port);
    })
  }
});