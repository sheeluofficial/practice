
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user)=>{
    return jwt.sign({user}, `${process.env.JWT_KEY}`);
}

const register = async(req, res)=>{
    try{
        console.log(req.body.email)
        const user = await User.findOne({email:req.body.email});
        console.log(user)
        if(user){
            return res.send("Email already registered, try some other email");
        }
        const createdUser = await User.create(req.body);        
        const token = newToken(createdUser);
        return res.status(201).send({createdUser, token});

    }
    catch(e){
        return res.send(e.message);
    }
    
}

const login = async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.send("Email or password not correct");
        }
        if(!user.checkPassword(req.body.password)){
            res.send("Email or password not correct");
        }
        

        var token = newToken(user);
        res.send({user, token});
    }
    catch(e){
        res.send(e.message);
    }
}


module.exports={register, login};