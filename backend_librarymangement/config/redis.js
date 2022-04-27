const redis = require("redis");

const client = redis.createClient();

(async () => {
  await client.connect();
})();

client.on("connect", () => {
  console.log("Connected to Redis Server");
});

client.on("error", (err) => {
  console.log(`Error:${err}`);
});

module.exports = client;
