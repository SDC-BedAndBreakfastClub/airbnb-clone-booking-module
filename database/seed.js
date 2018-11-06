const faker = require('faker');
const location = require('./Location.js');

const db = require('./index.js');

location.deleteMany({}, () => {});

const fakeDataset = [];

for (let i = 0; i < 100; i += 1) {
  const mockData = {
    id: i,
    pricing: faker.commerce.price(),
    average_review: (Math.random() * 5),
    total_reviews: (Math.floor(Math.random() * 200)),
    max_guests: (Math.floor(Math.random() * 6)),
    cleaning_fee: (Math.floor(Math.random() * 50)),
    service_fee: (Math.floor(Math.random() * 50)),
  };
  fakeDataset.push(mockData);
}


location.create(fakeDataset).then(() => db.close());
