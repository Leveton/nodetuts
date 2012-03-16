//This works if you're on Ubuntu(tested on 10.04)!!

var http = require('http');
var exec = require('child_process').exec;

http.createServer(function(request, response){
	response.writeHead(200, {
	  'Content-Type': 'text/plain'
	});

	var tail_child = exec('tail -f var/log/syslog');

	request.connection.on('end', function(){
      tail_child.kill();
	});

	tail_child.on('data', function(data){
	  console.log(data.toString());
	  response.write(data);
	});
}).listen(4000);