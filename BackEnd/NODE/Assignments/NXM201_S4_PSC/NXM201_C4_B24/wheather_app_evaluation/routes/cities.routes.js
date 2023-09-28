const { Router } = require("express");
const cityRouter = Router();
const { cityValidator } = require("../middlewares/cityvalidator");
const { getCityData, mostSearchedCity, myCity } = require("../controllers/cities.controller");




cityRouter.get("/:city", cityValidator, getCityData);
cityRouter.get("/mostsearchedcity", mostSearchedCity);
cityRouter.get("/mycity", myCity);

module.exports = { cityRouter };
