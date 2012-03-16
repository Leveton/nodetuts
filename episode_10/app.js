var express = require('express');

var app = express.createServer();

app.configure(function(){
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
})

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

app.get('/', function(req, res){
  res.render('root.jade');
});

var products = require('./products');

app.get('/products', function(req, res){
  res.render('products/index', {locals: {
    products: products.all
  }});
});

app.get('/products/:id', function(req, res){
  var product = products.find(req.params.id);
  res.render('products/show', {locals: {
    product: product
  }});
});

app.listen(4000);