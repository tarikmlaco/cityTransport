/**
 * Created by Tarik on 14.3.2015.
 */
var Messages = require('../models/messages');

exports.receiveMessages= function(req, res) {


    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    Messages.find({location: {$near: [longitude, latitude], $maxDistance: 10/111.12 }}).limit(10).sort({ _id: -1 }).exec(function(err, msgs){
        if (err)
            res.send(err);

        res.json(msgs);
    });
};

exports.postMessages= function(req, res){
    myMsg = new Messages();

    myMsg.location[1] = req.body.longitude;
    myMsg.location[0] = req.body.latitude;
    myMsg.user = req.body.user;
    myMsg.message = req.body.message;
    myMsg.rating = 0;

    myMsg.save(function(err){
        if(err)
        console.log("error:"+err);
        console.log("message added")
    });

};

exports.socketAddMessage = function(data){
    myMsg = new Messages();

    myMsg.location[1] = data.longitude;
    myMsg.location[0] = data.latitude;
    myMsg.user = data.user;
    myMsg.message = data.message;
    myMsg.rating = 0;

    myMsg.save(function(err){
        if(err)
            console.log("error:"+err);
        console.log("message added")
    });
}



//db.messages.find({location: {$near: [43.84248732, 18.31453474], $maxDistance: 2/111.12 }}).limit(10).sort({ _id: -1 });