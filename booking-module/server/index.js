require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
const cache = require('../redis/index.js');


const app = express();
const port = 80;

app.use(express.static('client/dist'));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/rooms/:listingId/listingdetails', (req, res) => {
  cache.get(`listing:${req.params.listingId}`, (err, json) => {
    if (json) {
      return res.status(200).set('Content-Type', 'application/json').send(json);
    }
    db.getListing(req.params.listingId, (dbErr, data) => {
      if (dbErr) { console.log(err); return res.sendStatus(500); }
      res.status(200).json(data);
      cache.set(`listing:${req.params.listingId}`, JSON.stringify(data));
    });
  });
});

app.get('/api/rooms/:listingId/booking', (req, res) => {
  cache.get(`booking:${req.params.listingId}`, (err, json) => {
    if (json) {
      return res.status(200).set('Content-Type', 'application/json').send(json);
    }
    db.getBookings(req.params.listingId, (dbErr, data) => {
      if (dbErr) { return res.sendStatus(500); }
      res.status(200).json(data);
      cache.set(`booking:${req.params.listingId}`, JSON.stringify(data));
    });
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
  cache.del(`booking:${req.params.listingId}`);
  db.updateBooking(body, (err, data) => {
    if (err) { return res.sendStatus(500); }
    return res.status(209).json(data);
  });
});

app.delete('/api/rooms/:listingId/booking', (req, res) => {
  const { body } = req;
  cache.del(`booking:${req.params.listingId}`);
  db.deleteBooking(body.id, (err) => {
    if (err) { return res.sendStatus(500); }
    return res.sendStatus(204);
  });
});
