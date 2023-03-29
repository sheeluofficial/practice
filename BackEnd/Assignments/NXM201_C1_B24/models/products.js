const mongoose = require("mongoose")

// Define Product Schema
const ProductSchema = new mongoose.Schema({
    name: String,
    cost_unit_price: Number,
    qty_available: Number,
    sku: String
  });
  

  // Define Product model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product