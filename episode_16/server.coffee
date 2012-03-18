###
You must install coffeescript globally to run the 'coffee' command
###

http = require 'http'
varname = false
http.createServer (req, res) ->
  str = 'Hello World!?'
  res.writeHead 200
  res.writeHead 'First ' if varname?
  res.end str unless false
.listen 4000