require('newrelic');
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
// const booking = require('../database/Booking.js');


const app = express();
const port = process.env.PORT || 3004;

app.use(express.static('client/dist'));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/rooms/:listingId/listingdetails', (req, res) => {
  db.getListing(req.params.listingId, (err, data) => {
    if (err) { return res.sendStatus(500); }
    console.log(data);
    return res.status(200).json(data);
  });
});

app.get('/api/rooms/:listingId/booking', (req, res) => {
  db.getBookings(req.params.listingId, (err, data) => {
    if (err) { return res.sendStatus(500); }
    return res.status(200).json(data);
  });
});

app.get('/rooms/:listingId/booking', (req, res) => {
  const options = {
    root: path.join(__dirname, '..', 'client/dist/'),
  };
  res.sendFile('index.html', options);
});

app.post('/api/rooms/:listingId/booking', (req, res) => {
  const { body } = req;
  body.listing_id = req.params.listingId;
  console.log(body);
  db.createBooking(body, (err, data) => {
    if (err) { return res.sendStatus(500); }
    return res.status(201).json(data);
  });
});

app.patch('/api/rooms/:listingId/booking', (req, res) => {
  const { body } = req;
  db.updateBooking(body, (err, data) => {
    if (err) { return res.sendStatus(500); }
    return res.status(209).json(data);
  });
});

app.delete('/api/rooms/:listingId/booking', (req, res) => {
  const { body } = req;
  db.deleteBooking(body.id, (err) => {
    if (err) { return res.sendStatus(500); }
    return res.sendStatus(204);
  });
});
