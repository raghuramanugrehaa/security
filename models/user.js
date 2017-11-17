var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', { strict: false } ,new Schema({
    name: String,
    password: String,
    admin: Boolean
}));