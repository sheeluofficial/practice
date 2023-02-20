const mongoose = require("mongoose")

const User = mongoose.Schema({
    name:{type:String, required: true},
    noOfQuestion:{type:Number, required: true},
    correctAnswer:{type:Number, required: true},
    category:{type:String, required: true},
    level:{type:String, required: true},
    accuracy:{type:Number, required: true}
},
{
    versionKey:false,
    timestamps:true
})

module.exports = new mongoose.model("user", User);