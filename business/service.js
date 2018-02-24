var Service = {}
require('date-utils');

var express = require('express');
var path = require('path');
var router = express.Router();

var mysql = require('../db/mysql');

Service.route = function() {  
  router.get('/bitcoin',function(req,res) {
    var orin_price = req.query.orin_price;
    var pool = mysql.getPool();

    pool.getConnection(function(err,connection){
      var query = connection.query('select id, coin_type, price, date_format(reg_date, "%Y%m%d%h%i%s") as reg_date from price_history', function (err, rows) {
          if(err){
            connection.release();
            console.log(err);
            throw err;
          } else if(rows.length) {            
          } else {
            console.log("Query didn't return any results.");
          }
          rows.forEach(row => {
            if(row.coin_type == 'ETH') {
              console.log(row.reg_date);
              var date = new Date();    
              console.log(date.toFormat('YYYYMMDDHH24MISS'));
            }
          });
          connection.release();
          console.log("release");
      });
      console.log(query);
    });
    res.send('');
  });
  return router;
}

module.exports = Service;


