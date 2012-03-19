var cfg = require('konphyg')(__dirname + '/config');
var db_conf = cfg('database');

console.log('db_conf:', db_conf);