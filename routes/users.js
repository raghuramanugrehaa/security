var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;



router.post('/:type/:id', function(req, res, next) {
	console.log("hit donw");
	var requestBody =req.body;
	var adhaar_id=req.params.id;
	var service_type=req.params.type
 var options = { headers: {
                    'QT_API_KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDErZFBSQjJsQm9vdytwYzA5eWFYZGNKeG1zY3ozbTFnTkhVQng1eEZwdmxwK2U4dDVESUtxaHNCSU9HaUc0azdnVUEyVTNHUDhLVXkyZjNRTmZqQmlHZDNTNlNzNTNRWWpNMnduSTluS282UUNGaGQ5UUVwMzBrOEp5MytvMnVVSXVBMGs4MjhpelptajhYZWp5VzFRb3R3Z0ZvbGk1NkM4Yz0iLCJpYXQiOjE1MDc4MDYyMDJ9.QB8JokF6_9DUTBM8_9W1amLjC6OvB88uTRifykYWev4'
                  },
                  url: "https://preprod.quagga.in/gateway/init/"+service_type+"/"+adhaar_id,

				  json: true,
				   body:requestBody
 }
			console.log(options);
  request.post(options, function(error, response, body) {
    res.set('Content-Type', 'Application/json');
    if (!error && response.statusCode == 200) {
        console.log("success response from adhaar api: "+body);
        res.status(response.statusCode).send(body);
    } else {
      console.log("failure response from adhaar api: "+body);
      res.status(response.statusCode).send(body);
    }
});
//res.send("Got up");
})

var thingSchema1 = new Schema({
   name: String,
   password: String,
   admin: Boolean
}, { strict: false });
   var Thing1 = mongoose.model('visitorsdata', thingSchema1);

router.post('/', function(req, res, next) {
  console.log("hit at users");
  var requestBody = req.body;
  //delete requestBody[token];
  var thing = new Thing1({requestBody});

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

module.exports = router;
