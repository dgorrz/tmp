var express = require('express');
var app = express();

//middleware
///a middleware with no mount path; gets executed for every request to the app
app.use(function(req, res, next){
  console.log('Time:', Date.now());
  next();
});

///a middleware mounted on / will be executed for any type of HTTP request to /
app.use('/', function(req, res, next){
  console.log
});

//routing methods
////get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, connect
////app.METHOD() - app.['m-search']()
app.get('/', function(req, res){
  res.send('hello world');
});

//routing handlers
app.get('/example/a', function(req, res){
  res.send('Hello form A!');
});

///using mora than one callback function
app.get('/example/b', function(req, res, next){
  console.log('response will be send by the next callback funtion...');
  next();
}, function(req, res){
  res.send('Hello from B!');
});

///using an array of callback functions
var fn1 = function(req, res, next){
  console.log('fn1');
  next();
}

var fn2 = function(req, res, next){
  console.log('fn2');
  next();
}

var fn3 = function(req, res, next){
  res.send('Hello from C!');
}

app.get('/example/c', [fn1, fn2, fn3]);
///using a combination of arrays and independent functions

var ifn1 = function(req, res, next){
  console.log('ifn1');
  next();
}

var ifn2 = function(req, res, next){
  console.log('ifn2');
  next();
}

app.get('/example/d', [ifn1, ifn2], function(req, res, next){
  console.log('response will be send by the next callback function...');
  next();
}, function(req, res){
  res.send('Hello from D!');
});

//app.route
app.route('/book')
  .get(function(req, res){
    res.send('Get a book');
  })
  .post(function(req, res){
    res.send('Add a book');
  })
  .put(function(req, res){
    res.send('Udpate a book');
  })

//error handling
///

app.listen(3000, function(){
  console.log('Server running at port 3000');
});