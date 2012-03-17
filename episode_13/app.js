var express = require('express');
var formidable = require("formidable")
app = express.createServer();
fs = require('fs');
var MemStore = express.session.MemoryStore
var users = require('./users');

delete express.bodyParser.parse['multipart/form-data'];

app.configure(function(){
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.session({ secret:'secret_key', store: MemStore( {
    reapInterval: 6000 * 10
  })}))
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function(){
  app.use(express.logger());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.dynamicHelpers(
{
  session: function(req, res){
    return req.session;
  },
  flash: function(req, res){
    return req.flash();
  }
 }
)

function requiresLogin(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/sessions/new?redir=' + req.url);
 }
};

app.get('/', function(req, res){
  res.render('root.jade');
});

/*sessions*/


app.get('/sessions/new', function(req, res){
  res.render('sessions/new', {locals: {
    redir: req.query.redir
  }});
});

app.post('/sessions', function(req, res){
  users.authenticate(req.body.login, req.body.password, function(user){
    if (user){
      req.session.user = user;
      res.redirect(req.body.redir || '/');
  } else {
    req.flash('warn', 'login failed');
    res.render('sessions/new', {locals: {redir:req.body.redir}})
   }  
  })
});

app.get('/sessions/destroy', function(req, res){
  delete req.session.user;
  res.redirect('/sessions/new')
});

var products = require('./products');

app.get('/products', requiresLogin, function(req, res){
  res.render('products/index', {locals: {
    products: products.all
  }});
});

app.get('/products/new', function(req, res){
  res.render('products/new', {locals: {
    product: req.body && req.body.product || products.new
  }});
});

app.post('/products', requiresLogin, function(req, res){
  var id = products.insert(req.body.product);
  res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res){
  var product = products.find(req.params.id);
  res.render('products/show', {locals: {
    product: product
  }});
});

app.get('/products/:id/edit', requiresLogin, function(req, res){
  var product = products.find(req.params.id);
  res.render('products/edit', {locals: {
    product: product
  }});
});

app.put('/products/:id', requiresLogin, function(req, res){
  var id = req.params.id;
  products.set(req.params.id, req.body.product);
  res.redirect('/products/'+id)
});

  app.get('/photos/new', function(req, res) {
      res.render('photos/new');
    });
    
  app.post('/photos', function(req, res) {
    console.log('in /photos handler');
    var form = new formidable.IncomingForm();

    form.uploadDir = __dirname + '/static/uploads/photos/';

    res.on('file', function(field, file) {
           fs.rename(file.path, file.name);
  })
    res.on('error', function(err) {
      console.log("an error has occured with form upload");
      console.log(err);
      req.resume();
  })
    res.on('aborted', function(err) {
      console.log("user aborted upload");
  })
    res.on('end', function() {
      console.log('-> upload done');
  });
    
    form.parse(req, function() {
      res.render('root.jade');
  });
});

app.listen(4000);