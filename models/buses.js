/**
 * Created by Tarik on 14.3.2015.
 */
var mongoose = require('mongoose');

var BusSchema = new mongoose.Schema({
    line: Number,
    type: String,
    location: {0: Number, 1: Number}
});

module.exports = mongoose.model('buses', BusSchema);