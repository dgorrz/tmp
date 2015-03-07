var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res){
	res.render('layouts/home');
});

app.get('/about', function(req, res){
	res.render('layouts/about', {fortune : fortune.getFortune()});
});

app.use(express.static(__dirname + '/public'));

//custom 404 pages
app.use(function(req, res){
	res.status(404);
	res.render('layouts/404');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('layouts/500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});