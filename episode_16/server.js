(function(){
	var http;
	http = require('http');
	http.createServer(function(req, res) {
		res.writeHead(200);
		return res.end('Hello World!?');
	}).listen(4000);
}).call(this);