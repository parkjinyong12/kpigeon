var Screen = {}

var express = require('express');
var path = require('path');
var router = express.Router();

Screen.route = function() {  
  router.get('/main',function(req,res) {
    res.render('main/main', { title: 'Express' })
  });
  router.get('/base',function(req,res) {
    res.render('main/base', { title: 'Express' })
  });
  router.get('/sub',function(req,res) {
    res.sendFile(path.join(__dirname,'/views/sub/sub.html'))
  });
  return router;
}

module.exports = Screen;


