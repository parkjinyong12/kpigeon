var Mysql = {}
var mysql      = require('mysql');

var pool = mysql.createPool({
  host     : 'methere123.cafe24.com',
  user     : 'bitcoin',
  password : 'wngus123',
  port     : 13306,
  database : 'bitcoin',
  connectionLimit:20,
  waitForConnections:false
});

Mysql.getPool = function() {
    return pool;
}

module.exports = Mysql;