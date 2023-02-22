const { response } = require('express');
const express = require('express');
const client = require('../cache');
const { logger } = require('../loggerConfig/logger');
const { Company } = require('../models/models');
const router = express.Router()


router.post('/companies', async function(req, res) { 
   
    let data = Company.create(req.body)

    res.send({msg:"Company created",data})
});



router.get('/companies', async function(req, res) {
    let cSymbol = req.params.symbol;
    let companiesData = await Company.find()
     
    res.send({msg:"Companies data",data:companiesData})

});


router.put('/companies/:id', async function(req, res) {

    let updatedCompany = await Company.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send({msg:"Company updated",data:updatedCompany})
});


router.delete('/companies/:id', async function(req, res) {

    let deletedCompany = await Company.findByIdAndDelete(req.params.id)
    res.send({msg:"Company deleted",data:updatedCompany})
});


module.exports = router




