#!/usr/bin/env node

var express = require('express');

var app = express.createServer();

app.configure(function(){
	app.use(app.router);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.static(__dirname + '/public'))

});

app.get('/', function(req, res){
	res.render('home', {layout : true});
});

app.listen('/tmp/acme_node.socket');