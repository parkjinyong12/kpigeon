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

    var orin_data = [];
    orin_data.url = "https://api.bithumb.com/public/ticker/";
    orin_data.coin_type = coin_type;

    var tasks = [        
        function(orin_data,callback) {            
            url=orin_data.url+orin_data.coin_type;
            request.get(url, function(err, res, result) {
                console.log("closing_price : " + JSON.parse(result).data.closing_price);   
                closing_price = JSON.parse(result).data.closing_price;
               
                next_data=[];
                next_data.type=orin_data.coin_type; 
                next_data.price=closing_price;     
                callback(null,next_data);
            });
        },
        function(next_data,callback) {
            pool.getConnection(function(err,connection){                 
                var query = connection.query('insert into price_history (coin_type, price) values (?, ?)',[next_data.type,next_data.price],function (err, result) {
                    if (err) {
                        console.error(err);    
                        throw err;  
                    }    
                    console.log(query);            
                });
            });        
        }
    ];
    async.waterfall(tasks, function(err, results) {
        console.log(results);        
    });
    res.send(200,'success');    
  });  
  return router;
}

module.exports = Bitcoin;