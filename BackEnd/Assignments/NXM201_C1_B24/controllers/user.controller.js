const express = require("express")
const router = express.Router()
const Product = require("../models/products")
const User = require("../models/users")
const Order = require("../models/orders")
const mongoose = require("mongoose")
const {ObjectId} = mongoose.Types

router.post('/', (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(user);
      }
    });
  });

  
  router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json(user);
      }
    });
  });



  
// GET endpoint to retrieve historical orders of a user
router.get('/:userId', async (req, res) => {
    try {
      // Retrieve the user ID from request parameters
      const userId = req.params.userId;
  
      // Validate that the user ID is a valid MongoDB ObjectId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      // Find all orders for the given user
      const orders = await Order.find({ userId }).populate('productId').populate('userId');
  
      // If no orders were found, return a 404 error
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      // Return the orders with user and product details
      return res.status(200).json({ orders });
    } catch (err) {
      // If an error occurred, return a 500 error
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  module.exports = router
  