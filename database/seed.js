var location = require('./Location.js');

location.Listing.create({}, function(err, listing) {
	if (err) throw err;
}