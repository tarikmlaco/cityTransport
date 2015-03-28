/**
 * Created by Tarik on 14.3.2015.
 */
var Buses = require('../models/buses');

// Create endpoint /api/beers for POSTS
exports.postBuses = function(req, res) {

    // Set the beer properties that came from the POST data
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    Buses.find({location: {$near: [longitude, latitude], $maxDistance: 10/111.12 }},function(err, buses) {
        if (err)
            res.send(err);

        res.json(buses);
    });
};

exports.getBuses = function(req, res) {
    //[43.84248732, 18.31453474]
//    db.buses.find({location: {$near: [43.84248732, 18.31453474], $maxDistance: 1/111.12 }});
    //var longitude = req.body.longitude;
    //var latitude = req.body.latitude;
    Buses.find({location: {$near: [43.84248732, 18.31453474], $maxDistance: 10/111.12 }},function(err, buses) {
        if (err)
            res.send(err);

        res.json(buses);
    });
};

exports.getBus = function(req, res) {
    Buses.findById(req.params.beer_id, function(err, beer) {
        if (err)
            res.send(err);

        res.json(beer);
    });
};

// Create endpoint for PUT
exports.putBus = function(req, res) {
    console.log("request for put");
    console.log('Parameters: ' + req.body.line + ' ' + req.body.latitude + ' ' + req.body.longitude);
    Buses.findOne({line: req.body.line}, function(err, bus) {
        if (err){
            res.send(err);
            console.log(err);
        }

        bus.location[0] = req.body.latitude;
        bus.location[1] = req.body.longitude;

        // Save the bus and check for errors
        bus.save(function(err) {
            if (err)
                res.send(err);

            res.json(bus);
        });
    });
};

// Create endpoint /api/mycoord/:bus_id for DELETE
exports.deleteBus = function(req, res) {
    Beer.findByIdAndRemove(req.params.bus_id, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Bus record removed!' });
    });
};