require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {body, validationResult} = require("express-validator");


const newToken=(user)=>{
    return jwt.sign({ user }, process.env.JWT_KEY);
}


const register = async(req , res)=>{

    try{
        let error = validationResult(req);
        if(!error.isEmpty()){
            res.send(error)
        }

        let user = await User.findOne({email:req.body.email});
        if(user){
            res.send("Please try another email or password");
        }

        user =await User.create(req.body);

        var token = newToken(user)

        console.log(token);
        res.send({user, token});
        
    }
    catch(e){
        res.send(e.message)
    }

}


const login = async (req, res)=>{
    try{
        
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.send("Enter valid email and password");
        }
        const match=user.checkPassword(req.body.password);
        if(!match){
            res.send("Enter valid email and password")
        }
        
        var token = newToken(user);
        res.send({token, user});
    }
    catch(e){
        res.send(e.message);
    }
}




module.exports = {register, login}






