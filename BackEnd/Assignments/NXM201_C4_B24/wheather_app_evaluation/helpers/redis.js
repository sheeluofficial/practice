const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("connect", async() => {
  console.log("Connected to Redis");
});

redisClient.on("error", function (err) {
  console.log(err.message);
})

redisClient.connect();

module.exports = { redisClient };
