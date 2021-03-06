// Load required packages
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    messageController = require('./controllers/messages'),
    router = require('./routes'),
    passport=require('passport'),
    path = require('path');

// Connect to the cityOS MongoDB
mongoose.connect('mongodb://localhost:27017/cityos', function(err, data){
    if(err)
    console.log("Error connecting to database!");
    console.log("Connected to database:" + data);
});

// Create our Express application
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Send current time to all connected clients
/*
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}
*/
// Send current time every 10 secs
//setInterval(sendTime, 10000);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome!' });

    socket.on('i am client', console.log);
    socket.on('publicmsg', function(message){
        /*console.log(message.sender);
        console.log(message.message);*/
        var data = new Object();
        data.user = message.sender;
        data.message = message.message;
        data.latitude = 43.831907;
        data.longitude = 18.485153;
        messageController.socketAddMessage(data);

    });
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'null');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', function(req, res){
    res.redirect('register.html');
});


// Register all our routes with /api
app.use('/api', router);

// Start the server
server.listen(3000);