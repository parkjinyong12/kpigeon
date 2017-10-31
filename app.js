var http = require('http');
var router = require('./routes/route');
var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3000);
app.set('view engine','jade');
app.set('views','./views');

app.use('/process',router.route());

/*Express 서버 시작*/
http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스 서버를 시작했습니다(개발) : ' + app.get('port'));
});


