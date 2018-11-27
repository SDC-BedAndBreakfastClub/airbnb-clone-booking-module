// const mongoose = require('mongoose');

// // localhost:27017
// const db = mongoose.createConnection('mongodb://localhost/booking');

// module.exports = db;

const { Pool } = require('pg');

const pool = new Pool({
  database: 'bnb',
  host: 'localhost',
});

exports.getListing = (id, cb) => {
  const queryStr = 'SELECT * FROM listings WHERE id = $1';
  pool.query(queryStr, [id])
    .then(({ rows }) => {
      cb(null, rows);
    })
    .catch(err => cb(err));
};

exports.getBookings = (listingId, cb) => {
  const queryStr = 'SELECT * FROM bookings WHERE listing_id = $1';
  pool.query(queryStr, [listingId])
    .then(({ rows }) => cb(null, rows))
    .catch(err => cb(err));
};

exports.createBooking = (info, cb) => {
  const {
    listing_id,
    check_in,
    check_out,
    username,
    user_id,
    guests,
  } = info;
  const queryStr = 'INSERT INTO BOOKINGS (listing_id, check_in, check_out, username, user_id, guests) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  const values = [listing_id, check_in, check_out, username, user_id, guests];
  pool.query(queryStr, values)
    .then(({ rows }) => cb(null, rows))
    .catch(err => cb(err));
};

exports.updateBooking = (info, cb) => {
  const {
    id,
    check_in,
    check_out,
    guests,
  } = info;
  const queryStr = 'UPDATE bookings SET check_in = $1, check_out = $2, guests = $3 WHERE id = $4 RETURNING *';
  const values = [check_in, check_out, guests, id];
  pool.query(queryStr, values)
    .then(({ rows }) => cb(null, rows))
    .catch(err => cb(err));
};

exports.deleteBooking = (id, cb) => {
  const queryStr = 'DELETE FROM bookings WHERE id = $1';
  pool.query(queryStr, [id])
    .then(({ rows }) => cb(null, rows))
    .catch(err => cb(err));
};
