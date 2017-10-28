var express = require('express');
var http = require('http');

/*익스프레스 객체 생성*/
var app = express();
var router = express.Router();

/*라운팅 함수 등록*/
router.route('/process').get(function(req,res) {
    console.log('welcome'); 
    
    var paramId2 = 'methere';
    var username = 'Jade';
    
    context={userid:paramId2,username:username};
    
    req.app.render('login_success',context,function(err, html) {
        
        if (err) {
            console.error('error : ' + err.stack);
        } else {
            console.log('rendered : ' + html);            
        }
        
        res.end(html);
    });
});
                      
app.use('/',router);

app.set('port',process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

console.log('뷰 엔진이 ejs로 설정되었습니다.');

var router = express.Router();
    
/*Express 서버 시작*/
http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스 서버를 시작했습니다(개발) : ' + app.get('port'));
});


