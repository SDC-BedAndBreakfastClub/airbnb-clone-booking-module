const express = require('express');
const bodyParser = require('body-parser');
const location = require('../database/location.js');

const app = express();
const port = process.env.PORT || 3004;

app.use(express.static('client/dist'));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/rooms/:listingId/booking', (req, res) => {
  location.find({ id: req.params.listingId })
    .exec((error, results) => {
      res.send(results);
    });
});

app.get('/rooms/:listingId/booking', (req, res) => {
  const options = {
    root: '/Users/jaybee/Desktop/gc/projects/fec/airbnb-clone-booking-module/client/dist/',
  };

  // res.set('Content-Type', 'text/html');
  //res.send(new Buffer('<h2>Test String</h2>'));
  res.sendFile('index.html', options);
  //res.end('hello');
});
