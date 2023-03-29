const mongoose = require("mongoose")
// Define User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    country: String,
    state: String,
    email: String,
    addresses: [
      {
        street_name: String,
        city: String,
        state: String,
        country: String,
        contact_no: String
      }
    ]
  });

  
// Define User model
const User = mongoose.model('User', UserSchema);

module.exports = User