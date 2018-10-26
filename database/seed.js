var mongoose = require('mongoose');
var location = require('./Location.js');
var db = require('./index.js');
var faker = require('faker');

var fakeDataset = [];

for (var i = 0; i < 100; i++) {
	var mockData = {
		pricing: faker.commerce.price(),
		average_review: (Math.random() * 5),
		total_reviews: (Math.floor(Math.random() * 200))
	}
	fakeDataset.push(mockData);
}

location.Listing.create(fakeDataset).then(() => db.close());