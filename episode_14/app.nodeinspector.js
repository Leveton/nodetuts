//You need to install nodemon, spark2 and node-inspector globally, not with package.json.

/* Node Inspector Instructions
first, after it's installed globally, in one terminal run: node --debug app.nodeinspector.js
second, in another terminal run: node-inspector
*/

var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200);
	res.end('Hello World!');
}).listen(4000);