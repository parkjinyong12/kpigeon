// import
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();

// setting
app.set('port',process.env.PORT || 23000);
app.set('view engine','jade');
app.set('views',path.join(__dirname,'/views'));
app.locals.basedir = app.get('views');

// resource
app.use('/js',express.static(path.join(__dirname,'/public/js')));
app.use('/css',express.static(path.join(__dirname,'/public/css')));
app.use('/video',express.static(path.join(__dirname,'/public/video')));
app.use('/img',express.static(path.join(__dirname,'/public/image')));

// controller
app.use('/screen',require('./component/screen').route());

// service
app.use('/service',require('./component/service').route());

app.use('/getmap',require('./component/getmap').route());
app.use('/bitcoin',require('./component/bitcoin').route());

// Express Server Start
http.createServer(app).listen(app.get('port'), function() {
    console.log('start server. port : ' + app.get('port'));
});


