import http from 'k6/http';

const ids = [];

for(let i = 0; i < 500000; i += 1) {
  ids.push(Math.floor(Math.random() * 10000000));
}

let counter = 0;

export default function() {
  let roomNum = ids[counter++ % ids.length];
  http.get(`http://localhost:3004/api/rooms/${roomNum}/listingdetails`);
};
