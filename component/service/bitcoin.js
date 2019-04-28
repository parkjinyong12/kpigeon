var Bitcoin = {}

require('date-utils');
var bithumb = require('./bithumb');
var express = require('express');
var request = require("request");
var async = require('async');
var mysql = require('../../db/mysql');

var router = express.Router();

Bitcoin.route = function() {

    router.get('/bitcoin',function(req,res) {
        
        var orin_price = req.query.orin_price;
        var pool = mysql.getPool();
    
        pool.getConnection(function(err,connection){
          var query = connection.query('select id, coin_type, price, date_format(reg_date, "%Y%m%d%h%i%s") as reg_date from price_history', function (err, rows) {
              
                if(err){                  
                    console.log("check an error")
                    //console.log(err);
                    connection.release(); 
                } else if(rows.length) { 
                    rows.forEach(row => {
                        if(row.coin_type == 'ETH') {
                        console.log(row.reg_date);
                        var date = new Date();    
                        console.log(date.toFormat('YYYYMMDDHH24MISS'));
                        }
                    });
                    connection.release();                
                } else {
                    console.log("Query didn't return any results.");
                    connection.release();
                }              
                
            });          
        });
        res.send('');
    });

    router.get('/recordHistory',function(req,res) {    
   
        coin_type=req.query.coin;
        var pool = mysql.getPool();

        var orin_data = {};
        orin_data.url= 'https://api.bithumb.com/public/ticker/';
        orin_data.coin_type = coin_type;
        
        var tasks = [        
            function(callback) {            
                url=orin_data.url+orin_data.coin_type;
                console.log('url : ' + url);
                request.get(url, function(err, res, result) {
                    var closing_price = JSON.parse(result).data.closing_price;                
                    console.log("closing_price : " + closing_price);                                  
                    data={};
                    data.type=orin_data.coin_type; 
                    data.price=closing_price;     
                    callback(null,data);
                });
            },
            function(data,callback) {
                pool.getConnection(function(err,connection){                 
                    var query = connection.query('insert into price_history (coin_type, price) values (?, ?)',[data.type,data.price],function (err, result) {
                        if (err) {
                            connection.release();
                            console.error(err);    
                            throw err;  
                        }                        
                        connection.release();
                        //console.log(query);            
                    });
                });        
            }
        ];
        async.waterfall(tasks, function(err, results) {
            console.log(results);        
        });
        res.send(200,'success');    
    });
    router.get('/getTradeStory',function(req,res) {       
        bithumb.setKey('6bcbb3f7443f90d53f6a7083a07b0a0c', 'e1430e6a8d9da2c7b52aa81240edd195');
        var coin_type = req.query.coin;
        var rgParams = {
            //order_currency : coin_type,
            //payment_currency : 'KRW'
            searchGb : '1',
            currency : coin_type
        };
        var tasks = [       
            function(callback) {      
                var result = bithumb.xcoinApiCall('/info/user_transactions', rgParams,function(err, result) { 
                    var data = [];
                    //data.type = rgParams.order_currency;
                    //data.price = result.closing_price; 
                    console.log(result[0]);                   
                    console.log(result[1]);                   
                    console.log(result[2]);                   
                    callback(null,data);    
                });                
            },
            function(data, callback) {      
                //console.log(data.type);
                //console.log(data.price);
                /*
                pool.getConnection(function(err,connection){                 
                    var query = connection.query('insert into price_history (coin_type, price) values (?, ?)',[data.type,data.price],function (err, result) {
                        if (err) {
                            connection.release();
                            console.error(err);    
                            throw err;  
                        }                        
                        connection.release();
                        //console.log(query);            
                    }); 
                }); 
                */
            },
        ];
        async.waterfall(tasks, function(err, results) {
            console.log(results);        
        });    
        res.send(200,'success');    
    });
    router.get('/getlastTrade',function(req,res) {       
        bithumb.setKey('6bcbb3f7443f90d53f6a7083a07b0a0c', 'e1430e6a8d9da2c7b52aa81240edd195');
        var coin_type = req.query.coin;
        var searchGb = req.query.search;
        var rgParams = {
            //order_currency : coin_type,
            //payment_currency : 'KRW'
            count : '1',
            searchGb : searchGb,
            currency : coin_type
        };
        var tasks = [       
            function(callback) {      
                bithumb.xcoinApiCall('/info/user_transactions', rgParams,function(err, result) { 
                    callback(null,coin_type,result);                    
                });                
            },
            function(coin_type, result, callback) {                
                var data = result[0];
                if(!(data == 'undefined' || data == null)) {
                    console.log(data);
                } else {
                    console.log("There is no data, " + coin_type);
                }               
            },
        ];
        async.waterfall(tasks, function(err, results) {
            console.log(results);        
        });    
        res.send(200,'success');    
    });
    router.get('/checkGap',function(req,res) {    
        bithumb.setKey('6bcbb3f7443f90d53f6a7083a07b0a0c', 'e1430e6a8d9da2c7b52aa81240edd195');
        coin_type=req.query.coin;
        var pool = mysql.getPool();       
        var tasks = [
            // 현재 거래 가격 가져오기
            function(callback) {                  
                var url = 'https://api.bithumb.com/public/ticker/' + coin_type;
                request.get(url, function(err, res, result) { 
                    callback(null,coin_type,result);
                });
            },
            function(coin_type,data,callback) {
                var closing_price = JSON.parse(data).data.closing_price;
                result = {
                    coin_type : coin_type,
                    closing_price : closing_price
                }
                callback(null,coin_type,closing_price);
            },
            // 최종 매입가격 불러오기
            function(coin_type,closing_price,callback) {  
                var rgParams = {
                    order_currency:coin_type,
                    payment_currency:'KRW'
                };   

                var ticket = true;
                var preHandler = true;
                var handler = false;

                bithumb.xcoinApiCall('/info/ticker', rgParams,function(err, callbackData) {                                                                         
                    callback(null,callbackData,coin_type,closing_price);
                });                
            },
            function(callbackData,coin_type,closing_price,callback) {
                result = {
                    now : closing_price,
                    buy : callData.closing_price,
                    type : coin_type                        
                }
                callback(null,result);
            },            
        ];
        async.waterfall(tasks, function(err, result) {
            
            var num = ((result.now-result.buy)/result.buy * 100);                
            num = num.toFixed(3);
            var gap = parseInt(result.now) - parseInt(result.buy);

            var fg_sell = 'N';
            var nm_sell = '아니오';
            if(num >= 5) { fg_sell = 'Y'; nm_sell = '예'; }
           

            console.log("화페종류 : " + result.type);
            console.log("현재가격 : " + result.now);
            console.log("구입가격 : " + result.buy);
            console.log("가격차이 : " + gap);
            console.log("이익률 : " + num);
            console.log("판매여부 : " + nm_sell);  
            
            var sendObj = {
                price_type : result.type,
                now_price : result.now,
                buy_price : result.buy,
                price_gap : gap,
                profit_ratio : num,
                fg_sell : fg_sell,
                nm_sell : nm_sell
            }              
            res.send(200,JSON.stringify(sendObj));      
        });          
    });
    return router;
}

module.exports = Bitcoin;