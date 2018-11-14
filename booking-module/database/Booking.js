const mongoose = require('mongoose');
const connection = require('./index.js');

const bookingSchema = new mongoose.Schema({
  id: Number,
  check_in: Date,
  check_out: Date,
  guests: Number,
  booking_location: String,
  user: String,
});

module.exports = connection.model('Reservation', bookingSchema);
