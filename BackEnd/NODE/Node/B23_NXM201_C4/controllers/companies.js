const express = require('express');
const { Company } = require('../models/models');
const router = express.Router()


router.post('/companies', function(req, res) {
  // Insert a new document into the Companies collection

});


router.get('/companies/:symbol', function(req, res) {
 
});


router.put('/companies/:symbol', function(req, res) {

});


router.delete('/companies/:symbol', function(req, res) {

});

module.exports = router
