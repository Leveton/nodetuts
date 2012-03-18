var express = require('express');
require('express-resource');

var app = express.createServer();

app.configure('development', function () {
  app.use(express.logger());
  app.use(express.bodyParser()); //assigns a 'body' property to the request
  app.use(express.methodOverride());  //replaces any request methods with underscore methods. bodyParser needs to be 1st!
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function () {
 app.use(express.logger());
  app.use(express.bodyParser()); //assigns a 'body' property to the request
  app.use(express.methodOverride());  //replaces any request methods with underscore methods. bodyParser needs to be 1st!
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('root');
});

products = app.resource('products', require('./modules/products'));
photos = app.resource('photos', require('./modules/photos'));
forums = app.resource('forums', require('./modules/forums'));
products.add(forums)

app.listen(4000);