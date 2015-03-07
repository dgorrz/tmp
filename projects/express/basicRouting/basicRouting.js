var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Got request by method GET');
});

app.post('/', function(req, res){
  res.send('Got request by method POST');
});

app.put('/', function(req, res){
  res.send('Got request by method PUT');
});

app.delete('/', function(req, res){
  res.send('Got request by method DELETE');
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('This basic server routing is listening at http://%s:%s', host, port);
});