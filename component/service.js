var service = {}

var express = require('express');
var router = express.Router();

// services
var getmap = require('./service/getmap');
var bitcoin = require('./service/bitcoin');

service.route = function(app) {  
  app.use('/service/getmap', getmap.route(app));
  app.use('/service/bitcoin', bitcoin.route(app));
  return router;
}

module.exports = service;


