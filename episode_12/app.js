var express = require('express');
var fs = require('fs');

var app = express.createServer();

app.configure(function() {
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/static'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('root');
});

var products = require('./products');
var photos   = require('./photos');

app.get('/products', function(req, res) {
  res.render('products/index', {locals: {
    products: products.all
  }});
});

app.get('/products/new', function(req, res) {
  var product = req.body && req.body.product || products.new();
  photos.list(function(err, photo_list) {
    if (err) {
      throw err;
    }
    res.render('products/new', {locals: {
      product: product,
      photos: photo_list
    }});

  });
});

app.post('/products', function(req, res) {
  var id = products.insert(req.body.product);
  res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res) {
  var product = products.find(req.params.id);
  res.render('products/show', {locals: {
    product: product
  }});
});

app.get('/products/:id/edit', function(req, res) {
  var product = products.find(req.params.id);
  photos.list(function(err, photo_list) {
    if (err) {
      throw err;
    }
    res.render('products/edit', {locals: {
      product: product,
      photos: photo_list
    }});
    
  });
});

app.put('/products/:id', function(req, res) {
  var id = req.params.id;
  products.set(id, req.body.product);
  res.redirect('/products/'+id);
});

/* Photos */

app.get('/photos', function(req, res) {
  photos.list(function(err, photo_list) {
    res.render('photos/index', {locals: {
      photos: photo_list
    }})
  });
});

app.get('/photos/new', function(req, res) {
  res.render('photos/new');
});

app.post('/photos', function(req, res) {
  console.log(req.files.photo);
  var newFile =__dirname+'/static/uploads/photos/'+ req.files.photo.name;
    fs.rename(req.files.photo.path , newFile, function (data,error) {
    console.log(data); 
    if(error) {
      throw error;
    }
  });
    res.redirect('/photos');
  
});

app.listen(4000);