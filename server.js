// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var path = require('path');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('we good');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('mouse location', function(mPos) // get from specific client
  {
  	io.emit('mouse location', mPos); //sending to all clients
  })

  socket.on('box move', function(tp, lft, userId, score)
  {
  	//$('#box').addClass('move1');
  	io.emit('box move', tp, lft, userId, score);
  })

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

// launch ======================================================================
//app.listen(port);
console.log('The magic happens on port ' + port);


