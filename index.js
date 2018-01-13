'use strict'
var mongoose = require('mongoose');

var app = require('./app');

var port = process.env.port || 4500;
mongoose.connect('mongodb://localhost:27017/app_albuns', (err, res)=>{
  if(err){
    throw err;
  }else{
    app.listen(port, ()=>{
      console.log("Api lisening in port:"+port);
    })
  }
});