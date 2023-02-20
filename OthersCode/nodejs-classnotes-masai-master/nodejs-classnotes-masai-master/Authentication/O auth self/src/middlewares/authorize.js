
let User=require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { all } = require("../controllers/product.controller");


const verifyToken=async (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, `${process.env.JWT_KEY}`, (err, user)=>{
            if(err){
                reject(err);
            }
            resolve(user);
        })
    })
}

const authorize = (allowed)=>{

    return async(req, res, next)=>{
        try{
            req.allowed=false;
            if(!req.headers.authorization){
                res.send("Authorization token not provided or invalid");
            }

            if(!req.headers.authorization.startsWith("Bearer")){
                res.send("Authorization token not provided or invalid");
            }

            const token=req.headers.authorization.split("Bearer ")[1];
            const user = await verifyToken(token);
            req.user = user.user;
            user.user.role.forEach(element => {
                if(allowed.includes(element)){
                    req.allowed=true;
                    
                }
            });
            return next();
            // return res.send("Not authorized to do this operation")
            

        }
        catch(e){
            res.send(e.message);
        }
    }

}



module.exports={authorize, verifyToken};