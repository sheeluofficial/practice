const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
});

module.exports = new mongoose.model("posts", postSchema);