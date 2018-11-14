const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const location = require('../database/Location.js');
const booking = require('../database/Booking.js');


const app = express();
const port = process.env.PORT || 3004;

app.use(express.static('client/dist'));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/rooms/:listingId/listingdetails', (req, res) => {
  location.find({ id: req.params.listingId })
    .exec((error, results) => {
      res.status(200).send(results);
    });
});

app.get('/api/rooms/:listingId/booking', (req, res) => {
  booking.find({ id: req.params.listingId })
    .exec((err, results) => {
      if (err) { return res.sendStatus(500); }
      return res.status(200).json(results);
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
  console.log(body);
  booking.create({
    id: req.params.listingId,
    check_in: body.check_in,
    check_out: body.check_out,
    booking_location: body.booking_location,
    user: body.user,
  }, (err, data) => {
    if (err) { return res.sendStatus(500); }
    return res.status(201).json(data);
  });
});

app.patch('/api/rooms/:listingId/booking', (req, res) => {
  const { body } = req;
  booking.findByIdAndUpdate(body.bookingId, {
    check_in: body.check_in,
    check_out: body.check_out,
    booking_location: body.booking_location,
    user: body.user,
  }, (err, data) => {
    if (err) { return res.sendStatus(500); }
    return res.status(209).json(data);
  });
});

app.delete('/api/rooms/:listingId/booking', (req, res) => {
  const { body } = req;
  booking.findByIdAndDelete(body.bookingId, (err) => {
    if (err) { return res.sendStatus(500); }
    return res.sendStatus(204);
  });
});
