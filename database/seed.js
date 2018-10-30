const faker = require('faker');
const location = require('./Location.js');
const db = require('./index.js');

const fakeDataset = [];

for (let i = 0; i < 100; i += 1) {
  const mockData = {
    pricing: faker.commerce.price(),
    average_review: (Math.random() * 5),
    total_reviews: (Math.floor(Math.random() * 200)),
  };
  fakeDataset.push(mockData);
}

location.Listing.create(fakeDataset).then(() => db.close());
