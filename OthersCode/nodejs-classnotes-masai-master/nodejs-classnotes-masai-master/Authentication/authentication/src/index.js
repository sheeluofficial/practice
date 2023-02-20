const express = require("express");
const {register, login}=require("./controllers/auth.controller");
const postcontroller = require("./controllers/post.controller");
const {body, validationResult} = require("express-validator");

const connect = require("./configs/db");
const { post } = require("./controllers/post.controller");

const app=express();

app.use(express.json());


app.post("/register",

    body("name").isString().isLength({min:3}),
    body("email").isEmail(),
    body("password").isStrongPassword(),

register);


app.post("/login", login);

app.use("/post", postcontroller);








app.listen(9000, ()=>{
    connect();
    console.log("Listening at 9000")
})