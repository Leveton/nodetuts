(function() {
  var clients, fs, http, io, server, socket, sys;
  http = require('http');
  fs = require('fs');
  sys = require('sys');
  io = require('socket.io');
  clients = [];
  server = http.createServer(function(request, response) {
    var rs;
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    rs = fs.createReadStream(__dirname + '/template.html');
    return sys.pump(rs, response);
  });
  socket = io.listen(server);
  socket.sockets.on('connection', function(client) {
    var username;
    username = null;
    client.send('Welcome to this socket.io chat server!');
    client.send('Please provide your user name');
    return client.on('message', function(message) {
      var feedback;
      if (!username) {
        username = message;
        client.send("welcome, " + username + "!");
        return;
      }
      feedback = "" + username + ": " + message;
      client.send(feedback);
      return client.broadcast.send(feedback);
    });
  });
  server.listen(4000);
}).call(this);
