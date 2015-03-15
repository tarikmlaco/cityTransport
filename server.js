// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var busController = require('./controllers/buses');
var messageController = require('./controllers/messages');

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
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
//setInterval(sendTime, 10000);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome!' });

    socket.on('i am client', console.log);
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'null');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(allowCrossDomain);

// Create our Express router
var router = express.Router();


router.route('/buses')
    .post(busController.postBuses)
    .put(busController.putBus)
    .get(busController.getBuses);


router.route('/messages')
    .post(messageController.postMessages);

router.route('/dummy')
    .get(function(req,res){
        console.log('Arduino call');
        res.send('This is dummy data');
    });

// Register all our routes with /api
app.use('/api', router);

// Start the server
server.listen(3000);
//app.listen(3000); Deprecated because of