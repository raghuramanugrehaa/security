var express = require('express');
var router = express.Router();
var User = require('../models/boys');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app=express();
 var thingSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean
}, { strict: false });
    var Thing = mongoose.model('client', thingSchema);
    




router.post('/auth', function(req, res) {

  // find the user
  console.log("go hit");
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token

        var token = jwt.sign(user, 'scotch', {

       

          expiresIn: 3600 // expires in 24 hours
		});

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      

    }
	}

  
});
});



router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
console.log("hit at token"+token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'scotch', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


router.post('/setup', function(req, res) {

  // create a sample user
  console.log("hit at setipt");
  var requestBody = req.body;
  //delete requestBody[token];
  var thing = new Thing({requestBody});
  
  thing.save(function(err) {
    if (err) {
		  res.json({ success: false,message:"Error occured while saving data please try again" });
	}
else{
    console.log('User saved successfully');
    res.json({ success: true,message:'Data saved successfully '});
}
  });
  

});

//users



module.exports = router;
