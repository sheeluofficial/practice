const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true, unique: true },
});

const orderSchema = new mongoose.Schema({
  company_symbol: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: Date, required: true },
});

const Company = mongoose.model('Company', companySchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Company,
  Order,
};