var http = require('http');
var fs = require('fs');
var util = require('util');

var file_path = __dirname + '/cat.jpg';
fs.stat(file_path, function (err, stat) {

    if (err) {
        throw err;
    }

    http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-length': stat.size
        });

        var mike = fs.createReadStream(file_path);

        util.pump(mike, res, function (err) { //returns false if the buffer is not drained
            if (err) {
                throw err;
            }
        })

    }).listen(1337, "127.0.0.1");
});
