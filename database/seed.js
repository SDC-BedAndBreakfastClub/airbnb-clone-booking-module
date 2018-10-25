var location = require('./Location.js');
var faker = require('faker');

for (var i = 0; i < 100; i++) {

	location.Listing.create({
		pricing: faker.commerce.price(),
		average_review: (Math.random() * 5),
		total_reviews: (Math.floor(Math.random() * 200))
	}, function(err, listing) {
		if (err) throw err;
	}
}