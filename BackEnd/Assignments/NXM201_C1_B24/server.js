const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DatabaseConnection = require('./utils/db');
const ordersController = require("./controllers/order.controller")
const productsController = require("./controllers/product.controller")
const usersController = require("./controllers/user.controller")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection 
DatabaseConnection()

  // API routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/orders",ordersController)
app.use("/products",productsController)
app.use("/users",usersController)

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});