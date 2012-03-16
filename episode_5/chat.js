var net = require('net');
var carrier = require('carrier');

var connections = [];

net.createServer(function (conn) {
    connections.push(conn);

    conn.on('close', function () {
        var pos = connections.indexOf(conn);
        if (pos >= 0) {
            connections.splice(pos, 1);
        }
    });

    conn.write("hello welcome to the chat server" + "\n");
    conn.write("please input a username" + "\n");
    var username;


    carrier.carry(conn, function (line) {
        if (!username) {
            username = line;
            conn.write("Hello " + username + "!\n")
            return;
        }

        if (line == 'quit') {
            conn.end()
            return;
        }

        var feedback = username + ": " + line + "\n";

        connections.forEach(function (one_connection) {
            one_connection.write(feedback);



        });
    })
}).listen(4000);
