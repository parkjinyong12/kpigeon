var screen = {}

var express = require('express');
var path = require('path');
var router = express.Router();

screen.route = function() {

  // main
  router.get('/main',function(req,res) {
    res.render('main/main', { title: 'Express' });
  });

  // main by region
  router.get('/region',function(req,res) {
    res.render('region/main', { title: 'Express' });
  });  

  // map
  router.get('/map',function(req,res) {
    res.sendFile(path.join(__dirname,'../views/sub/googleMap.html'));
  });

  // navbar sample
  router.get('/navbar',function(req,res) {
    res.sendFile(path.join(__dirname,'../views/sub/navbar.html'));
  });
  
  return router;
}

module.exports = screen;


