const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://database/booking');

module.exports = db;
