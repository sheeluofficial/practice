const mongoose = require("mongoose")

const Score = mongoose.Schema({
    grossSpeed : {type:Number, required:true},
    netSpeed : {type:String, required:true},
    accuracy : {type:String, required:true},
    totalSeconds : {type:Number, required:true},
    totalWords : {type:Number, required:true},
    totalChars : {type:Number, required:true},
    totalWrongChars : {type:Number, required:true},
    freqOfWrongChars : [[{type:String}]],
    feedback : {type:String, },
    paragraphTitle : {type:String, required:true},
    user : {type:mongoose.Types.ObjectId, ref:"user"}
},{
    versionKey:false,
    timestamps:true
}) 

module.exports = new mongoose.model("score", Score)