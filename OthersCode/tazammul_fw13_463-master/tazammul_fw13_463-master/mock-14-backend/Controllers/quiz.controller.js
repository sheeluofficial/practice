const express = require("express");
const Quiz = require("../Models/quiz.model");
const route = express.Router();

route.get("/", async (req, res)=>{
    let {category,amount,difficulty}=req.query;
    if(category == "all" && difficulty == "all")
    {
        let data = await Quiz.find().limit(amount);
        return res.status(200).send({error:false, data})
    }
    else if(category == "all")
    {
        let data = await Quiz.find({difficulty}).limit(amount);
        return res.status(200).send({error:false, data})
    }
    else if(difficulty == "all")
    {
        let data = await Quiz.find({category}).limit(amount);
        return res.status(200).send({error:false, data})
    }
    else{
        let data = await Quiz.find({category, difficulty}).limit(amount);
        return res.status(200).send({error:false, data})
    }
})

route.post("/", async (req, res)=>{
    const data = await Quiz.create(req.body);
    res.status(200).send(data);
})
module.exports = route;