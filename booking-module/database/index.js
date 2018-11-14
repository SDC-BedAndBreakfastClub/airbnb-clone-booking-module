const mongoose = require('mongoose');

// localhost:27017
const db = mongoose.createConnection('mongodb://database/booking');

module.exports = db;
