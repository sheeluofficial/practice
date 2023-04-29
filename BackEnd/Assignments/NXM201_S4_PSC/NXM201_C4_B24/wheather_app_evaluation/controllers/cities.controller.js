const { redisClient } = require("../helpers/redis");
const { logger } = require("../middlewares/logger");
const axios = require("axios");
const { UserCitiesList } = require("../models/city.model");
const API_KEY = process.env.OW_API_KEY;


const getCityData = async (req, res) => {
  try {
    const city = req.params.city || req.preferred_city;

    const isCityInCache = await redisClientisClient.get(city);
    // If the city is already in cache
    if (isCityInCache) return res.status(200).send(isCityInCache);
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    const weatherData = response.data;
    // Store the weathe data in the cache and set expirty time for 30 min ( 30 * 60sec)
    await redisClient.set(city, JSON.stringify(weatherData), { EX: 30 * 60 });


    await UserCitiesList.findOneAndUpdate({ userId: req.body.userId }, {
      userId: req.body.userId, $push: { previousSearches: city }
    }, { upsert: true, new: true, setDefaultsOnInsert: true })

    return res.status(200).send({ data: weatherData });
  } catch (error) {
    // using logger to log the errors to mongodb errors collection
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }
}


const mostSearchedCity = async (req, res, next) => {


  try {
    const city = await UserCitiesList.aggregate([{ $match: { userId: req.userId } }, { $unwind: "$previousSearches" }, {
      $group: {
        _id: "$previousSearches", "count": { "$sum": 1 }
      }
    }, 
    {
      $sort:{count:-1}
    }
    ]);


    const isCityInCache = await redisClientisClient.get(city);

    // If the city is already in cache
    if (isCityInCache) return res.status(200).send(isCityInCache);

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );

    const weatherData = response.data;
    // Store the weathe data in the cache and set expirty time for 30 min ( 30 * 60sec)
    await redisClient.set(city, JSON.stringify(weatherData), { EX: 30 * 60 });


    await UserCitiesList.findOneAndUpdate({ userId: req.body.userId }, {
      userId: req.body.userId, $push: { previousSearches: city }
    }, { upsert: true, new: true, setDefaultsOnInsert: true })

    return res.status(200).send({ data: weatherData });
    
  } catch (error) {
    // using logger to log the errors to mongodb errors collection
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }

}

const myCity = async (req, res, next) => {

  try {
    
    const city = req.preferred_city;


    const isCityInCache = await redisClientisClient.get(city);

    // If the city is already in cache
    if (isCityInCache) return res.status(200).send(isCityInCache);

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );

    const weatherData = response.data;
    // Store the weathe data in the cache and set expirty time for 30 min ( 30 * 60sec)
    await redisClient.set(city, JSON.stringify(weatherData), { EX: 30 * 60 });

    return res.status(200).send({ data: weatherData });

  } catch (error) {
    // using logger to log the errors to mongodb errors collection
    logger.error(error);
    return res.status(500).send({ error: error.message });
  }

}

module.exports = {getCityData, myCity, mostSearchedCity}