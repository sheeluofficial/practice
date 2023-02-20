const mongoose = require("mongoose")

const Quiz = mongoose.Schema({
    question:{type:String, required:true},
    category:{type:String, required:true},
    difficulty:{type:String, required: true},
    correct_answer:{type:String, required: true},
    incorrect_answers:[{type:String, required:true}]
},
{
    versionKey:false,
    timestamps:true
})

module.exports = new mongoose.model("Quiz", Quiz);