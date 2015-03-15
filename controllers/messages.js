/**
 * Created by Tarik on 14.3.2015.
 */
var Messages = require('../models/messages');

exports.postMessages= function(req, res) {


    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    Messages.find({location: {$near: [longitude, latitude], $maxDistance: 10/111.12 }}).limit(10).sort({ _id: -1 }).exec(function(err, msgs){
        if (err)
            res.send(err);

        res.json(msgs);
    });
};

//db.messages.find({location: {$near: [43.84248732, 18.31453474], $maxDistance: 2/111.12 }}).limit(10).sort({ _id: -1 });