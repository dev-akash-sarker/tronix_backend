const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-14532.c276.us-east-1-2.ec2.cloud.redislabs.com",
    port: 14532,
  },
});

const DEFAULT_EXPIRATION = 3600; // 1 hour

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();

redisClient.on("error", (err) => console.error("Redis Client Error", err));

const RedisCacheProducts = async (key, cb) => {
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const freshData = await cb();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.error("Redis cache error:", error);
    throw error;
  }
};

module.exports = RedisCacheProducts;
