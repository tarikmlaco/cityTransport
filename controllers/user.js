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

    if(req.body.secret=="10031992")
    var bus= new Buses({
        transport_type: 'bus',
        line: 0,
        type: 'Point',
        token: user.token,
        location: {0: 0, 1: 0}
    });

    if(req.body.secret=="12041992")
        var bus= new Buses({
            transport_type: 'tram',
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
            if(bus!=undefined)
            bus.save(function(err){
                if(err)
                res.json({message: 'Error saving vehicle! Token: ' + user.token, token: user.token});
                else
                res.json({message: 'New user has been added! Token: ' + user.token, token: user.token});
            });
            else
            res.json({message: 'Pedestrian user saved! Token: ' + user.token, token: user.token});
    });
};

exports.loginUser = function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if(err)
        res.send(err);
        user.verifyPassword(req.body.password, function(err, isMatch){
            if(err)
            res.json({error: err});
            if(!isMatch) {
                res.json({error: 'Wrong password!'});
                console.log('Wrong password!');
            }
            else
            {
                Buses.findOne({token: user.token}, function(err, bus){
                    if(err)
                    res.json({error: err});
                    res.json({token: bus.token, flag: 1});
                });
            }
        });
    });
};

exports.logoutUser=function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if(err)
        res.send(err);
        user.verifyPassword(req.body.password, function(err, isMatch){
            if(err)
                res.json({error: err});
            if(!isMatch) {
                res.json({error: 'Wrong password!'});
                console.log('Wrong password!');
            }
            else
            {
                res.send('User logged out!');
            }
        });
    });
};

exports.getUsers = function(req, res){
    User.find(function(err, users){
        if(err)
            res.send(err);
        res.json(users);
    });
};