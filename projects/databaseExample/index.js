var express = require('express');
var app = express();

app.get('/add', function(req, res){
	var db = require('mongoskin').db('mongodb://localhost:27017/library');

	db.collection('books').find().toArray(function(err, result){
		if(err) console.log(err.stack);
		  res.send(result);
	});
  //res.send('donde');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!' + err.stack);
});

app.listen(3000, function(){
  console.log('Server running at port 3000');
});