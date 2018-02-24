var Bitcoin = {}

require('date-utils');
var express = require('express');
var request = require("request");
var async = require('async');
var mysql = require('../db/mysql');
var router = express.Router();

var coin_types = ['BTC', 'ETH', 'DASH', 'LTC', 'ETC', 'XRP', 'BCH', 'XMR', 'ZEC', 'QTUM', 'BTG', 'EOS']

Bitcoin.route = function() {  
  router.get('/recordHistory',function(req,res) { 
    var pool = mysql.getPool();  

    for(var i=0;i<12;i++) {
        var content = '';
        var coin_type = coin_types[i];
        url = "https://api.bithumb.com/public/ticker/" + coin_type;
        
        var closing_price;
        var tasks = [        
            function(callback) {
                request.get(url, function(err, res, result) {
                    content += "price("+ coin_type +") : " + JSON.parse(result).data.closing_price + "\n";   
                    closing_price = JSON.parse(result).data.closing_price;
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
    }  
    res.send(200,content);    
  });

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
                var query = connection.query('insert into price_history (coin_type, price) values (?, ?)',['ETH',closing_price],function (err, result) {
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