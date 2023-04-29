const { Router } = require("express");
const cityRouter = Router();
const { cityValidator } = require("../middlewares/cityvalidator");

const getCityData = require("../controllers/cities.controller");


cityRouter.get("/:city", cityValidator, getCityData);

module.exports = { cityRouter };
