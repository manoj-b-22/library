const redis = require("redis");

// let host = 'localhost'
let host = 'redisdb'

const client = redis.createClient({ socket: { port: 6379, host: host } });

(async () => {
  await client.connect();
})();

client.on("error", (err) => {
  console.log(`Error:${err}`);
});

client.on("connect", () => {
  console.log("Connected to Redis Server");
});

module.exports = client;
