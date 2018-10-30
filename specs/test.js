const MongoMemoryServer = require('mongodb-memory-server').default;
const { MongoClient } = require('mongodb');

const mongoServer = new MongoMemoryServer();

let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect('mongodb://localhost:27017/booking');
  db = await connection.db('booking');
});

afterAll(async () => {
  await connection.close();
  await mongoServer.stop();
});

test('database is seeded with files', async () => {
  const files = db.collection('listings');

  const topFiles = await files
    .count();

  expect(topFiles).toBe(100);
});
