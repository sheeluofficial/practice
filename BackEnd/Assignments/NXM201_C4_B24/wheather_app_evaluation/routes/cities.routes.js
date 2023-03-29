const { Router } = require("express");
const cityRouter = Router();
const { redisClient } = require("../helpers/redis");
const { cityValidator } = require("../middlewares/cityvalidator");
const { apiLimiter } = require("../middlewares/limiter");
const { logger } = require("../middlewares/logger");
const axios = require("axios");
const { UserCitiesList } = require("../models/city.model");
const API_KEY = process.env.OW_API_KEY;

cityRouter.get("/:city", cityValidator, apiLimiter, async (req, res) => {
  try {
    const city = req.params.city;
    const isCityInCache = await redisClient.get(city);
    // If the city is already in cache
    if (isCityInCache) return res.status(200).send(isCityInCache);
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    const weatherData = response.data;
    // Store the weathe data in the cache and set expirty time for 30 min ( 30 * 60sec)
    await redisClient.set(city, JSON.stringify(weatherData), { EX: 30 * 60 });


     await UserCitiesList.findOneAndUpdate({userId:req.body.userId},{userId: req.body.userId, perferredCity:city, 
      $push: { previousSearches: city } 
    },{ upsert: true, new: true, setDefaultsOnInsert: true })

    return res.status(200).send({ data: weatherData });
  } catch (error) {
    // using logger to log the errors to mongodb errors collection
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { cityRouter };
