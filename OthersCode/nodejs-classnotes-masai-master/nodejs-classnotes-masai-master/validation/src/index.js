const express = require("express");
const connect = require("./configs/db");
const userController=require("./controllers/user.controller");

const app=express();

app.use(express.json());

app.use("/user", userController);



app.listen(4321, async()=>{
    await connect();
    console.log("Listening at 4321");
});