const express=require('express');
const cors=require('cors');
const connect=require("./Config/db")
const userLogincontroller=require("./Controllers/user.controller")
const blogController = require("./Controllers/blog.controller")
const PORT = process.env.PORT || 8081
const app=express();
app.use(cors());
app.use(express.json())

app.use("/user",userLogincontroller);
app.use("/blog",blogController);

app.listen(PORT,async()=>{
    await connect();
    console.log("Server is listening on port "+PORT)
})