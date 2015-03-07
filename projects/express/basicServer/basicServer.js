var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('This is a basic server');
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('This basic server is listening at http://%s:%s', host, port);
});