
const express = require("express")
const router = express.Router()
const Product = require("../models/products")
const User = require("../models/users")
const Order = require("../models/orders")
// Add a new order
router.post('/', async (req, res) => {
    const { product_id, user_id, status, timeline } = req.body;
  
    try {
      // Check if the product exists and has enough quantity
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }
      if (product.qty_available < 1) {
        return res.status(400).json({ message: 'Product out of stock' });
      }
  
      // Check if the user exists
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Create the order
      const order = new Order({
        product: product_id,
        user: user_id,
        status,
        timeline
      });
      await order.save();
  
      // Update the product quantity
      product.qty_available--;
      await product.save();
  
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Update an order
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, timeline } = req.body;
  
    try {
      // Find the order by ID
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update the order
      if (status) {
        order.status = status;
      }
      if (timeline) {
        order.timeline.push(timeline);
      }
      await order.save();
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/summary', async (req, res) => {
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
  
    try {
      const statsForall = await Order.aggregate([
        // Filter orders within the date range
        {
          $match: {
            created_at: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        // Group orders by status and count them
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        }
      ]);

      const orderStatus = {
        "Confirmed":0,
        "Yet to dispatch":0,
        "Dispatched":0,
        "Delivered":0
    };
     // Calculate the total number of orders
    let totalOrders = 0;

    orders.forEach((order)=>{
        if(order._id==="Confirmed") orderStatus.Confirmed +=1
        if(order._id==="Yet to Dispatch") orderStatus["Yet to Dispatch"] +=1
        if(order._id==="Dispatched") orderStatus.Dispatched +=1
        if(order._id==="Delivered") orderStatus.Delivered +=1
        totalOrders += 1;
        
    })
    const stats = {
      totalOrders,
      ...orderStatus
    };

  
      // Construct the response object
      const response = {
       ...stats
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router
