const express=require('express');
const cors=require('cors')
const app=express();
app.use(cors());
app.use(express.json())
const PORT=process.env.PORT || 8080;
const connect=require("./Config/db");
const userCrontroller=require("./Controllers/user.controller");
const quizController=require("./Controllers/quiz.controller");
app.use("/user",userCrontroller)
app.use("/quiz",quizController)
app.listen(PORT,async()=>{
    await connect();
    console.log("server is listening on ",PORT)
})