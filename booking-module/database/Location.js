const mongoose = require('mongoose');
const connection = require('./index.js');

const locationSchema = new mongoose.Schema({
  id: Number,
  pricing: Number,
  average_review: Number,
  total_reviews: Number,
  max_guests: Number,
  cleaning_fee: Number,
  service_fee: Number,
});

module.exports = connection.model('Listing', locationSchema);
