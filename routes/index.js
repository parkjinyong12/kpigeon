var index = {};


index.route = function(app,router) {
    
  /* GET home page. */
  router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });  
}


module.exports = index;
