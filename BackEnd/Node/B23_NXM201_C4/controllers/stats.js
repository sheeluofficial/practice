const express = require('express');
const client = require('../cache');
const router = express.Router();


setInterval(() => {
    updateCache();
  }, 60 * 1000);
  
  function updateCache() {

    const orders = [];

    const statsByCompany = {};
    for (const order of orders) {
      const symbol = order.symbol;
      if (!statsByCompany[symbol]) {
        statsByCompany[symbol] = {
          maxPrice: order.price,
          minPrice: order.price,
          numOrders: 1
        };
      } else {
        const stats = statsByCompany[symbol];
        if (order.price > stats.maxPrice) {
          stats.maxPrice = order.price;
        }
        if (order.price < stats.minPrice) {
          stats.minPrice = order.price;
        }
        stats.numOrders++;
      }
    }
  

    for (const symbol in statsByCompany) {
      const today = new Date().toISOString().split('T')[0];
      const cacheKey = `company:${symbol}:stats:${today}`;
      const data = statsByCompany[symbol];
      client.set(cacheKey, JSON.stringify(data), 'EX', 86400, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
  
  router.get('/company/:symbol/stats', (req, res) => {
    const symbol = req.params.symbol;
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `company:${symbol}:stats:${today}`;
  

    client.get(cacheKey, (err, cachedData) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (cachedData) {

        return res.json(JSON.parse(cachedData));
      }
  
     
      const data = {
        symbol,
        maxPrice: null,
        minPrice: null,
        numOrders: 0
      };
      return res.json(data);
    });
  });

  module.exports  = router