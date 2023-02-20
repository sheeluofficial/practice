const express = require("express");
const data = require("./books.json");
const port=4000;
const app = express();


app.get("",(req, res)=>{
    return res.send("Hello peeps, Abhishek Here");
})

app.get("/books",(req,res)=>{
    return res.send({books:data})
})

app.listen(4000,()=>{
    console.log(`Listening on ${port} port`);
});




