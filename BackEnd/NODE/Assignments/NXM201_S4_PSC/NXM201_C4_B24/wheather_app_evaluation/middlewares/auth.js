const jwt = require("jsonwebtoken");
const { redisClient } = require("../helpers/redis");

const authenticator = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Please login again" });
    }
    const isTokenValid = await jwt.verify(token, process.env.JWT_SECRET);

    if (!isTokenValid)
      return res.status(403).send({ msg: "Authentication failed, please login again." });

    const isTokenBlacklisted = await redisClient.get(isTokenValid.userId);
    // check in redis cache
    if (isTokenBlacklisted) return res.status(403).send({ msg: "Unautorized" });

    req.body.userId = isTokenValid.userId;
    req.body.preferred_city = isTokenValid.preferred_city;
    next();

  } catch (error) {
    res.send({ msg: "Please login", err: error.message });
  }
};
module.exports = { authenticator };
