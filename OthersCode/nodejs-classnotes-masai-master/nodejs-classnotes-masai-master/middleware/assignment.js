const express = require ("express");

const app = express();


app.get("/books",allBooks,(req,res)=>{
    res.send("All Books");
    
})



app.get("/book/:name",singleBook,(req, res)=>{
    res.send({bookName: req.name});
})


function singleBook(req, res, next){
    req.name=req.params.name;
    console.log(req.params.name);
    next();
}
function allBooks(res, res, next){
    console.log("All books")
    next();
}

app.listen(4000, ()=>{
    console.log("Listening at 4000");
})