var Index = {}

var express = require('express');
var router = express.Router();

Index.route = function() {  

  router.get('/index',function(req,res) {
    //res.send('Hello /process/login');
    res.render('index', { title: 'Express' });    
  });
  router.get('/error',function(req,res) {
    res.render('error', { title: 'Express' });    
  });
  return router;
}


module.exports = Index;


