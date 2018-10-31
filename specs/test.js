const MongoMemoryServer = require('mongodb-memory-server').default;
const location = require('../database/location.js');
const db = require('../database/index.js');

const mongoServer = new MongoMemoryServer();

afterAll(async () => {
  await db.close();
  await mongoServer.stop();
});

test('database is seeded with files', async () => {
  const topFiles = await location.count();
  expect(topFiles).toBe(100);
});
