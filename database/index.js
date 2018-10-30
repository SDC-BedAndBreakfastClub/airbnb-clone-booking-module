const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/booking');

module.exports = db;
