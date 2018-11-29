const redis = require(redis);

const client = redis.createClient({host: '172.31.35.149'});

module.exports = client;