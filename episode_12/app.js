var express = require('express');
var formidable = require("formidable")
app = express.createServer();
fs = require('fs');

delete express.bodyParser.parse['multipart/form-data'];

app.configure(function(){
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/static'));
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

app.get('/', function(req, res){
  res.render('root.jade');
});

var products = require('./products');

app.get('/products', function(req, res){
  res.render('products/index', {locals: {
    products: products.all
  }});
});

app.get('/products/new', function(req, res){
  res.render('products/new', {locals: {
    product: req.body && req.body.product || products.new
  }});
});

app.post('/products', function(req, res){
  var id = products.insert(req.body.product);
  res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res){
  var product = products.find(req.params.id);
  res.render('products/show', {locals: {
    product: product
  }});
});

app.get('/products/:id/edit', function(req, res){
  var product = products.find(req.params.id);
  res.render('products/edit', {locals: {
    product: product
  }});
});

app.put('/products/:id', function(req, res){
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
           fs.rename(file.path, form.uploadDir + "/" + file.name);
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