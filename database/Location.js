const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  id: Number,
  pricing: Number,
  average_review: Number,
  total_reviews: Number,
});

exports.Listing = mongoose.model('Listing', locationSchema);
