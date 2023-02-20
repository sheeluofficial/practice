const mongoose = require("mongoose")
const testsSchema= new mongoose.Schema(        {
    testName:{
        type:String,required:true
    },
    subject:{
        type:String,required:true
    },
    marks:{type:Number, required:true
    },
    date:{type:String, required:true},
    student:{type:mongoose.Types.ObjectId,ref:"student", required:true}
 },{
    versionKey:false,
    timestamps:true
 })
 module.exports=new mongoose.model("test", testsSchema)