var Mysql = {}
var mysql      = require('mysql');

// 비트코인
/*
var pool = mysql.createPool({
  host     : 'methere123.cafe24.com',
  user     : 'bitcoin',
  password : 'wngus123',
  port     : 13306,
  database : 'bitcoin',
  connectionLimit:20,
  waitForConnections:false
});
*/
// 버스 정보
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'public_data_user',
  password : 'wngus123',
  port     : 3306,
  database : 'public_data_storage',
  connectionLimit:20,
  waitForConnections:false
});


Mysql.getPool = function() {
    console.log('complete get pool')
    return pool;
}

module.exports = Mysql;