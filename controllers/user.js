/**
 * Created by Tarik on 27.3.2015.
 */
var User = require('../models/users');

exports.postUsers = function(req, res){
    console.log("I'm here!");
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log("And I passed this test!");
    user.save(function(err){
        if(err)
            res.send(err);
        res.json({message: 'New user has been added!'});
    });
};

exports.getUsers = function(req, res){
    User.find(function(err, users){
        if(err)
            res.send(err);
        res.json(users);
    });
};