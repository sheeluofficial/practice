const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const galleryController= require("./controllers/gallery.controller");

const app=express();

app.use(express.json());

app.use("/user", userController);
app.use("/gallery", galleryController);





app.listen(5432, async(req, res)=>{
    await connect();
    console.log("Listening at 5432");
});

