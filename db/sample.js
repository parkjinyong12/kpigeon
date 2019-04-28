var Mysql = {}
var mysql      = require('mysql');


var pool = mysql.createPool({
  host     : 'host',
  user     : 'user',
  password : 'password',
  port     : 99999,
  database : 'database_name',
  connectionLimit:20,
  waitForConnections:false
});

Mysql.getPool = function() {
    console.log('complete get pool')
    return pool;
}

module.exports = Mysql;