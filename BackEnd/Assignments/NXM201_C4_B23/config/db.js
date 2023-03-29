const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const connectDatabase = ()=> mongoose.connect("mongodb+srv://sheeluofficial:Sheeluofficial1@cluster0.imemjzv.mongodb.net/?retryWrites=true&w=majority")
 
     module.exports = connectDatabase