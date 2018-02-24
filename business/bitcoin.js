var Bitcoin = {}

require('date-utils');
var express = require('express');
var request = require("request");
var async = require('async');
var mysql = require('../db/mysql');
var router = express.Router();

Bitcoin.route = function() {  
  router.get('/recordHistory',function(req,res) {    
   
    var pool = mysql.getPool();  
    url = "https://api.bithumb.com/public/ticker/ALL"
   
    var closing_price;
    var tasks = [        
        function(callback) {
            request.get(url, function(err, res, result) {
                console.log("closing_price : " + JSON.parse(result).data.ETH.closing_price);   
                closing_price = JSON.parse(result).data.ETH.closing_price;
                callback(null);
            });
        },
        function(callback) {
            pool.getConnection(function(err,connection){
                var date = new Date();    
                var query = connection.query('insert into price_history (coin_type, price, reg_date) values (?, ?, ?)',['ETH',closing_price,date.toFormat('YYYYMMDDHH24MISS')],function (err, result) {
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