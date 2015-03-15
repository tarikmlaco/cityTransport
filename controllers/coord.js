/**
 * Created by Tarik on 14.3.2015.
 */
exports.postCoord = function(req, res, next) {
    // Create a new instance of the Beer model
    var response = new Object();
    //console.log(req.body);
    console.log(req)
    // Set the beer properties that came from the POST data
    response.lat = req.body.latitude;
    response.long = req.body.longitude;


    // Save the beer and check for errors
        res.json({ message: 'You sent me some data!', coords: response});

};
