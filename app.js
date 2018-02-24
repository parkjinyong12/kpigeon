/* Module */
var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

/* Setting */
//var business = require('./business/business');
//var service = require('./business/service');
//var screen = require('./business/screen');
var bitcoin = require('./business/bitcoin');

app.set('port',process.env.PORT || 23000);
app.set('view engine','jade');
app.set('views',path.join(__dirname,'/views'));
app.locals.basedir = app.get('views');

/* Resources */
app.use('/js',express.static(path.join(__dirname,'/public/js')));
app.use('/css',express.static(path.join(__dirname,'/public/css')));
app.use('/video',express.static(path.join(__dirname,'/public/video')));
app.use('/img',express.static(path.join(__dirname,'/public/image')));

/* Process */
//app.use('/business',business.route());
//app.use('/service',service.route());
//app.use('/screen',screen.route());
app.use('/bitcoin',bitcoin.route());

/* Express Server Starting */
http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스 서버를 시작했습니다(개발) : ' + app.get('port'));
});


