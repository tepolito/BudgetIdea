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

process.on('SIGTERM', function()
{
  console.log('SIGTERM'); 
})

process.on('uncaughtException', function()
{
  console.log('uncaughtException');
})

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

http.listen(port, function(){
  console.log('listening on *:' + port);
});  

ACTIVE_ROOMS = [];

io.on('connection', function(socket)
{
	console.log('we good');
  console.log(ACTIVE_ROOMS);

    
  /*io.engine === io.eio // => true
  Object.keys(io.engine.clients) // => [ 'US8AxrUrrDF_G7ZUAAAA', 'Ov2Ca24Olkhf2NHbAAAB' ]
  Object.keys(io.eio.clients)

  io.engine.clientsCount // => 2
  io.eio.clientsCount

  console.log(

    io.engine === io.eio, // => true
  Object.keys(io.engine.clients),  // => [ 'US8AxrUrrDF_G7ZUAAAA', 'Ov2Ca24Olkhf2NHbAAAB' ]
  Object.keys(io.eio.clients)

    )*/ 

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('mouse location', function(mPos) // get from specific client
  {
  	io.emit('mouse location', mPos); //sending to all clients
  })

  socket.on('box move', function(tp, lft, userId, score, data)
  { 
  	//$('#box').addClass('move1');
  	io.emit('box move', tp, lft, userId, score, data);    
  })    

  socket.on('winning',function()
  { 
    io.emit('winning', $('.box').hide());  
  })

  socket.on("keydown", function(key)
  {  
    console.log(key); 
    io.emit("keydown", key);
  })

  socket.on("keyup", function(key)
  {
    io.emit("keyup", key);
  })

  socket.on('createRoom', function(room)
  {
    console.log(room);
    ACTIVE_ROOMS.push(room);
    console.log(ACTIVE_ROOMS);

    socket.room = room;

    socket.join(room);

    msg = `you connected to room: ${room}`;  

    socket.emit('message', msg);

    io.emit('createRoom', room);
  })

  socket.on('joinRoom', function (room)
  {
    console.log(`trying to join room: ${room}`);

    socket.room = room;

    socket.join = room;

    msg = `you connected to ${room}`;

    socket.emit('message', msg);

    io.emit('joinRoom', room);
  })

  socket.on('load', function()
  {
    socket.emit('load', ACTIVE_ROOMS);
  })

});



// launch ======================================================================
//app.listen(port);
console.log('The magic happens on port ' + port);


