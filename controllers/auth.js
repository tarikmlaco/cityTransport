/**
 * Created by Tarik on 28.3.2015.
 */
var passport=require('passport'),
    BasicStrategy=require('passport-http').BasicStrategy,
    User = require('../models/users');

passport.use(new BasicStrategy(function(username, password, callback){
    User.findOne({username: username},function(err, user){
        if(err) {return callback(err);}
        if(!user){return callback(null,false);}

        user.verifyPassword(password, function(err, isMatch){
            if(err) {return callback(err);}
            if(!isMatch){return callback(null, false);}
            return callback(null, user);
        });
    });
}));


exports.isAuthenticated=passport.authenticate('basic', {session:false});
