var mongoose = require('mongoose');
var listing = require('./seed.js')

mongoose.connect('mongodb://localhost:27017/booking');

var db = mongoose.connection;

module.exports = db;