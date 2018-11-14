const mongoose = require('mongoose');

// localhost:27017
const db = mongoose.createConnection('mongodb://localhost/booking');

module.exports = db;
