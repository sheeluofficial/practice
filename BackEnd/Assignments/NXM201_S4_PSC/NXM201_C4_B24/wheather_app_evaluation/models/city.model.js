const mongoose = require("mongoose");

const UserCities = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  previousSearches: [{ type: String, required: true }],
});

const UserCitiesList = mongoose.model("cities", UserCities);
module.exports = { UserCitiesList };
