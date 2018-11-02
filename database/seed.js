const faker = require('faker');
const location = require('./Location.js');

const db = require('./index.js');

const fakeDataset = [];

fakeDataset.push({
  _id: '5bd91f697190430ef5e5a400', pricing: 200, average_review: 3.5, total_reviews: 145,
});

for (let i = 1; i < 100; i += 1) {
  const mockData = {
    pricing: faker.commerce.price(),
    average_review: (Math.random() * 5),
    total_reviews: (Math.floor(Math.random() * 200)),
    max_guests: (Math.floor(Math.random() * 6)),
  };
  fakeDataset.push(mockData);
}


location.create(fakeDataset).then(() => db.close());
