var Screen = {}

var express = require('express');
var path = require('path');
var router = express.Router();

Screen.route = function() {  
  router.get('/main',function(req,res) {
    res.render('main', { title: 'Express' })
  });
  return router;
}


module.exports = Screen;


