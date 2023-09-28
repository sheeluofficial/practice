const mongoose = require("mongoose")

// Connect to MongoDB
const DatabaseConnection  = ()=> mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = DatabaseConnection