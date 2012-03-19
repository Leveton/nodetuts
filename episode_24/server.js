var net = require('net')

net.createServer(function(conn){
	conn.on('data', function(data){
	  setTimeout(function(){
	  	conn.end(data);
	    }, 500);
	  })
	
}).listen(4000)