const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: Number,
  check_in: Date,
  check_out: Date,
  guests: Number,
  booking_location: String,
  user: String,
});

exports.Booking = mongoose.model('Booking', bookingSchema);
