var express = require('express');

var app = express.createServer();

app.configure('development', function(){
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function(){
	app.use(express.logger());
	app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout:true});

app.get('/', function(req, res){
	res.render('root.jade');
});

app.listen(4000);