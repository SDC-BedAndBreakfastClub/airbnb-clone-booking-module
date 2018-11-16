const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('./listings.csv');

stream.write('"id","price","name","averageReview","totalReviews","maxGuests","cleaningFee","serviceFee"\n');

let i = 1;
const max = process.argv[2] || 10000;

const write = () => {
  let ok = true;
  while (i <= max && ok) {
    const price = faker.commerce.price(75, 350);
    const name = faker.random.words(3);
    const averageReview = Math.random() * 4 + 1;
    const totalReviews = Math.floor(Math.random() * 200);
    const maxGuests = Math.floor(Math.random() * 5) + 1;
    const cleaningFee = Math.floor(Math.random() * 50);
    const serviceFee = Math.floor(Math.random() * 50);
    ok = stream.write(`"${i}","${price}","${name}","${averageReview}","${totalReviews}","${maxGuests}","${cleaningFee}","${serviceFee}"\n`);
    i += 1;
  }
  if (i <= max) {
    console.log(`waiting for a drain at i = ${i}`);
    stream.once('drain', write);
  } else {
    console.log('DONE');
    stream.end();
  }
};

write();
