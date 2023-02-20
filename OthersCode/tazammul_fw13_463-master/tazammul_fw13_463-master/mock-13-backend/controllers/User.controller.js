const express = require("express");
const jwt = require('jsonwebtoken');
const SECRET_KEY="xYa89@hj";
const User = require("../model/User.model");
const route = express.Router();

route.post("/", async (req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
            const resp = await User.create(req.body);
            let token = jwt.sign({ id:resp._id, email: req.body.email, image:req.body.image }, SECRET_KEY);
            res.status(201).send({error:false,message:"registered", token, data:resp})
        }
        else
        {
            let token = jwt.sign({ id:user._id, email: req.body.email, image:req.body.image }, SECRET_KEY);
            res.status(200).send({error:false, message:"loggedin", token, data:user})
        } 
    } 
    catch(err)
    {
        res.status(200).send({error:true, message:err})
    } 
})

route.get("/:token",async(req,res)=>{
    try{
      var decoded = jwt.verify(req.params.token, SECRET_KEY);
      return res.status(200).send({error:false, id:decoded.id, email:decoded.email, image:decoded.image})
    }catch(err){
      return res.status(400).send({error:true,message:err.message})
    }
  })

route.get("/", async (req, res)=>{
    const data = await User.find();
    res.status(200).send(data);
})
module.exports = route;