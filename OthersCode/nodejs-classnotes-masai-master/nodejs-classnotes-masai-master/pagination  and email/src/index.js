const express = require("express");
const userController = require("./controllers/user.controller");
const connect = require("./configs/db");
const app=express();

app.use(express.json());

app.use("/user", userController);








app.listen(2345, async()=>{
    await connect();
    console.log("Listening at 2345");
});