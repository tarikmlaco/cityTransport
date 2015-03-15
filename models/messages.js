/**
 * Created by Tarik on 14.3.2015.
 */
var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    rating: Number,
    message: String,
    user: String,
    location: {0: Number, 1: Number}
});

module.exports = mongoose.model('messages', MessageSchema);