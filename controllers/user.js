/**
 * Created by Tarik on 27.3.2015.
 */
var User = require('../models/users'),
    uid = require('rand-token').uid,
    Buses = require('../models/buses');

exports.postUsers = function(req, res){
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        token: uid(16)
    });

    var bus= new Buses({
        transport_type: 'bus',
        line: 0,
        type: 'Point',
        token: user.token,
        location: {0: 0, 1: 0}
    });

    user.save(function(err){
        if(err) {
            res.json({message: 'Error creating user, username probably exists.'});
            console.log(err);
        }
        else
            bus.save(function(err){
                if(err)
                res.json({message: 'Error creating user, cannot save vehicle.'});
                else
                res.json({message: 'New user has been added! Token: ' + user.token, token: user.token});
            })

    });
};

exports.getUsers = function(req, res){
    User.find(function(err, users){
        if(err)
            res.send(err);
        res.json(users);
    });
};