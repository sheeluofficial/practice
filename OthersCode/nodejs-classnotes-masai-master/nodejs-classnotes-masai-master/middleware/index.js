const express = require("express");

const app=express();

app.use(logger);

function logger(req, res, next){
    console.log("Before get");
    next();
    console.log("After get")
}

app.get("/",(req,res)=>{
    res.send("Home Page");
    console.log("home")
})

app.listen(1234,()=>{
    console.log("Listening at 1234");
})