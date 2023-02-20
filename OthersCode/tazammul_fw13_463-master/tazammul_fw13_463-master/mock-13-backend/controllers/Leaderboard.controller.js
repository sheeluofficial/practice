const express = require("express");
const jwt = require('jsonwebtoken');

const Leaderboard = require("../model/Leaderboard.model")


const route = express.Router();

// route.get("/:token", async (req, res)=>{
//     var resp =  await Leaderboard.find().populate("user").populate("bestScore");
//     resp.sort((a,b)=> b.bestScore.netSpeed - a.bestScore.netSpeed)
//     try{
//         var decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
//         return res.status(200).send({error:false, userID:decoded.id, data:resp})
//       }catch(err){
//         return res.status(200).send({error:false, data:resp})
//       }
// })

route.get("", async(req, res)=>{
    try{
        const resp =  await Leaderboard.find().populate("user").populate("bestScore");
        
        resp.sort((a,b)=> b.updatedAt - a.updatedAt)
        resp.sort((a,b)=> b.bestScore.netSpeed - a.bestScore.netSpeed)
        return res.status(200).send({error:false, data:resp})
    }
    catch(err){
        return res.status(400).send({error:true,message:err.message})
      }
})

module.exports = route;