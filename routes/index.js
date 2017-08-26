var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config');
<<<<<<< HEAD

=======
var app=express();
>>>>>>> ddae33eb929d173fe8111652567adfa414838b5f

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({
    name: 'Cerminara',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

<<<<<<< HEAD
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
=======

>>>>>>> ddae33eb929d173fe8111652567adfa414838b5f
// route to return all users (GET http://localhost:8080/api/users)
router.get('/user', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.post('/auth', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
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
<<<<<<< HEAD
        var token = jwt.sign(user, 'scotch', {
=======
        var token = jwt.sign(user, app.get('supersecret'), {
>>>>>>> ddae33eb929d173fe8111652567adfa414838b5f
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
<<<<<<< HEAD
//users

=======
>>>>>>> ddae33eb929d173fe8111652567adfa414838b5f

module.exports = router;
