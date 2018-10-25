var express = require('express');
var app = express();
var port = process.env.PORT || 3004;

app.use(express.static('client/dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));