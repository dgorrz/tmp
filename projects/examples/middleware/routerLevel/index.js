var express = require('express');
var app = express();
var router = express.Router();

//middleware
///a middleware with no mount path; gets executed for every request to the app
router.use(function(req, res, next){
  console.log('Time: ', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to /user/:id
router.use('/user', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack which handles GET requests to /user/:id ex. http://localhost:3000/user/55
router.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); // 
}, function (req, res, next) {
  res.send('ID diferent to 0');
});

// handler for /user/:id which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.send('This is a special page for the ID 0');
});

// mount the router on the app
app.use('/', router);

app.listen(3000, function(){
  console.log('Server running at port 3000');
});