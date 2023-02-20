const express = require("express");

const mongoose = require("mongoose");

const app=express();

const connect=()=>{

    return mongoose.connect("mongodb+srv://abhishek:abhi_123@cluster0.re1nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

}



app.listen(6000, async ()=>{
    await connect();
    console.log("Running at 6000 ")
});






