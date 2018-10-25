var mongoose = require('mongoose');
var listing = require('./seed.js')

var db = mongoose.connect('mongodb://localhost:27017/booking');

module.exports = db;