var GetMap = {}

require('date-utils');
var bithumb = require('./bithumb');
var express = require('express');
var request = require("request");
var async = require('async');
var mysql = require('../db/mysql');

var router = express.Router();

GetMap.route = function() {  
    router.get('/marker',function(req,res) {

        
        console.log(2);
        var pool = mysql.getPool();  
        console.log(req);  
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
        
    });
    return router;
}

module.exports = GetMap;