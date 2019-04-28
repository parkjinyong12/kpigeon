var GetMap = {}

var express = require('express');
var request = require('request');
var async = require('async');
var mysql = require('../db/mysql');
var XMLHttpRequest = require('xhr2');

var router = express.Router();

GetMap.route = function() {      
    router.post('/marker',function(req,res) {
        console.log(2);
        var pool = mysql.getPool();
        console.log(req.body);       
        req.on('data',function(data) {
            console.log(data);
        });        
        console.log(3);
        var minlat = req.query.minlat;        
        var minlng = req.query.minlng;
        var maxlat = req.query.maxlat;        
        var maxlng = req.query.maxlng;
        console.log(minlat);
        console.log(minlng);
        console.log(maxlat);
        console.log(maxlng);
        console.log(1);
        var tasks = [
            function() {
                pool.getConnection(function(err,connection){ 
                    if(err) {                        
                        console.log(err);
                    }                
                    var query = connection.query('select * from CardBusStatisticsServiceNew where id between ? and ?',[1,10],function (err, result) {
                        if (err) {
                            connection.release();
                            console.error(err);    
                            throw err;  
                        }                    
                        console.log(result[2]);    
                        connection.release();                              
                    });
                });        
            }
        ];
        async.waterfall(tasks, function(err, results) {
            console.log(results);        
        });
        res.send('');
    });
    return router;
}
router.get('/insertBusRouteList',function(req,res) {    
       
    var pool = mysql.getPool();

    var call_data = {};    
    call_data.url= 'http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList';
    call_data.service_key='9wCYaPLOSa1KqCsPK%2B6WckvpK6NaoVzfseRW8o%2FrFzBxdHOuzHLJu%2FLUffoibrjlGbbd2CtbaYa3jYDufnZ8DQ%3D%3D';
        
    var tasks = [        
        function(callback) {            
            url=call_data.url+'?' + 'ServiceKey=' + encodeURIComponent(call_data.service_key) + '&busRouteId=' + encodeURIComponent('421'); ;

            console.log('url : ' + url);
            var callReq = new XMLHttpRequest();
            var result = '';
            callReq.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200) {
                    console.log(this.readyState + ' , Enter');
                    result = this;
                    console.log(result);
                } else {
                    console.log(this.readyState);
                }
            }
            callReq.open("GET",url,true);
            callReq.send();
                 
            callback(null,result);
        },
        function(data,callback) {
            console.log(data);
            //var itemList = data.getElementsByTagName("itemList")[0];
            //console.log(itemList);
        },
        function(data,callback) {

            /* pool.getConnection(function(err,connection){                 
                var query = connection.query('insert into price_history (coin_type, price) values (?, ?)',[data.type,data.price],function (err, result) {
                    if (err) {
                        connection.release();
                        console.error(err);    
                        throw err;  
                    }                        
                    connection.release();
                    //console.log(query);            
                });
            }); */        
        }
    ];
    async.waterfall(tasks, function(err, results) {
        console.log('-- END --');        
    });
    res.send(200,'success');    
});

module.exports = GetMap;