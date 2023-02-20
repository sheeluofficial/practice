const mongoose=require("mongoose");

const Blog=new mongoose.Schema({
    title:{type:String,required:true},
    category:{type:String,required:true},
    author:{type:String,required:true},
    content:{type:String,required:true},
    image:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId, ref:"user" ,required:true},
},{
    versionKey:false,
    timestamps:true
})

module.exports = new mongoose.model("blog",Blog);
