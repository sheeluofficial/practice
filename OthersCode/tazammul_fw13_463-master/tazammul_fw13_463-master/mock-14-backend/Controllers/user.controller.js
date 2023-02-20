const express = require("express");
const User = require("../Models/user.model");
const route = express.Router();

route.get("/", async (req, res)=>{
    const data = await User.find().sort({accuracy:-1});
    res.status(200).send(data);
})
route.post("/", async (req, res)=>{
    const data = await User.create(req.body);
    res.status(200).send(data);
})
module.exports = route;