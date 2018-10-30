const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = process.env.PORT || 3004;

app.use(express.static('client/dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/rooms/:listingId/booking', (req, res) => {
  db.listings.find({ _id: req.params.listingId })
    .then(info => res.json(info))
    .error(() => res.end());
});
