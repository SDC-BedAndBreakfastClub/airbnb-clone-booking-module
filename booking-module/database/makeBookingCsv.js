const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const { Transform } = require('stream');

// const { createInterface } = require('readline');

const listings = fs.createReadStream('./listings.csv');

const bookings = fs.createWriteStream('./bookings.csv');

// const lineReader = createInterface({ input: listings });

const createBooking = (idx, listingId, name) => {
  const checkIn = moment(faker.date.between('2018-06-01', '2019-06-01')).format('YYYY-MM-DD');
  const stayLength = Math.floor(Math.random() * 6) + 1;
  const checkOut = moment(checkIn).add(stayLength, 'days').format('YYYY-MM-DD');
  const guests = Math.floor(Math.random() * 6) + 1;
  const userName = faker.name.findName();
  const userId = 500000000 - idx;
  return `"${idx}",${listingId},${name},"${checkIn}","${checkOut}","${guests}","${userName}","${userId}"\n`;
};

class BookingsGenerator extends Transform {
  constructor(options) {
    super(options);
    this.cache = '';
    this.idx = 1;
  }

  _transform(chunk, enc, cb) {
    const lines = (this.cache + chunk.toString()).split('\n');
    this.cache = lines.pop();
    lines.forEach((line) => {
      const [listingId, , name] = line.split(',');
      if (listingId === '"id"') {
        console.log('HIIII');
        return;
      }
      const numBookings = Math.floor(Math.random() * 20);
      for (let idx = 0; idx <= numBookings; idx += 1) {
        const output = createBooking(this.idx, listingId, name);
        this.idx += 1;
        this.push(output);
      }
    });
    cb();
  }

  _flush(cb) {
    if (this.cache.length) {
      const [listingId, , name] = this.cache.split(',');
      const numBookings = Math.floor(Math.random() * 20);
      for (let idx = 0; idx < numBookings; idx += 1) {
        const output = createBooking(this.idx, listingId, name);
        this.idx += 1;
        this.push(output);
      }
    }
    cb();
  }
}

const bookingsGenerator = new BookingsGenerator();

bookings.write('"id","listingId","listingName","checkIn","checkOut","guests","userName","userId"\n');

listings.pipe(bookingsGenerator).pipe(bookings);
