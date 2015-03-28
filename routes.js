/**
 * Created by Tarik on 27.3.2015.
 */
var express = require('express'),
    busController = require('./controllers/buses'),
    userController = require('./controllers/user'),
    messageController = require('./controllers/messages'),
    authController = require('./controllers/auth'),
    router = express.Router();


router.route('/buses')
    .post(busController.postBuses)
    .get(busController.getBuses);

router.route('/buses/update')
    .post(busController.putBus);


router.route('/messages')
    .post(messageController.receiveMessages);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/dummy')
    .get(function(req,res){
        res.send('No. 2 in 3 mins');
    });

module.exports = router;