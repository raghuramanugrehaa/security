var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
 image:{type:String,required:true},
 name:{type:String,required:true},
 address:{type:String,required:true},
 gender:{type:String,required:true},
 dob:{type:String,required:true},
 phoneno:{type:Number,required:true},
 timeIN:{type:String,required:true},
 timeOUT:{type:String,required:true}

});
model.exports = mongoose.model('visitors',schema);