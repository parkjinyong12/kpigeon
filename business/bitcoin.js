var Bitcoin = {}

require('date-utils');
var express = require('express');
var request = require("request");
var async = require('async');
var mysql = require('../db/mysql');
var router = express.Router();

Bitcoin.route = function() {  
  router.get('/recordHistory',function(req,res) {    
   
    coin_type=req.query.coin;
    var pool = mysql.getPool();  
    url = "https://api.bithumb.com/public/ticker/" + coin_type;
   
    var closing_price;
    var tasks = [        
        function(callback) {
            request.get(url, function(err, res, result) {
                console.log("closing_price : " + JSON.parse(result).data.closing_price);   
                closing_price = JSON.parse(result).data.closing_price;
                coin_type=coin_type;
                callback(null);
            });
        },
        function(callback) {
            pool.getConnection(function(err,connection){                 
                var query = connection.query('insert into price_history (coin_type, price) values (?, ?)',[coin_type,closing_price],function (err, result) {
                    if (err) {
                        console.error(err);    
                        throw err;  
                    }    
                    console.log(query);            
                });
            });        
        }
    ];
    async.series(tasks, function(err, results) {
        console.log(results);        
    });
    res.send(200,'success');    
  });  
  return router;
}

module.exports = Bitcoin;