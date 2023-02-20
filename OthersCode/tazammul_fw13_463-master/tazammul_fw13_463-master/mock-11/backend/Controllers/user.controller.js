const express=require('express');
const route=express.Router();
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
const User=require("../Models/user.model")

var secret = "w34wPAk0bYQy";

route.get("/",async(req,res)=>
{
    try{
      const users=await User.find();
      return res.status(200).send({error:false, data:users});
    }
    catch(err)
    {
      return res.status(400).send({error:true, message:err.message});
    }
})


route.post("/login", async (req, res) => {
    try{
        const body = req.body;
      const user = await User.findOne({ email: body.email });
      if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          var token = jwt.sign({ email: user.email, userID:user._id, userName:user.name }, secret);
          return res.status(200).json({error:false, login:true, message: "Logged In Successfully" ,token:token,data:user});
        } else {
          return res.status(400).json({error:false,  login:false,message: "Invalid Password" });
        }
      } else {
        return res.status(401).json({error:false, login:false, message: "User does not exist" });
      }
    }
    catch(err)
    {
      return res.status(400).send({error:true, message:err.message});
    }
});

route.post("/verify",async(req,res)=>{
    let token = req.headers.authorization.split(" ")[1];
    try{
      var decoded = jwt.verify(token, secret);
      return res.status(200).send({error:false, data:decoded})
    }catch(err){
      return res.status(400).send({error:true, message:err.message});
    }
  })

route.post("/register", async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
      if(user){
        return res.status(400).send({error:true,message:"An account is already associated with the given email."})
      }
      req.body.password = await bcrypt.hash(req.body.password, salt);
      return res.status(200).send({error:false, message:"registration sucesssfull", data:await User.create(req.body)});
    }
    catch(err)
    {
      return res.status(400).send({error:true, message:err.message});
    }
})


module.exports=route;