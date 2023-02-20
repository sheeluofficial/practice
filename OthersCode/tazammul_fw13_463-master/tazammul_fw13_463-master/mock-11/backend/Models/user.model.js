const mongoose=require("mongoose");

const User=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports = new mongoose.model("user",User);