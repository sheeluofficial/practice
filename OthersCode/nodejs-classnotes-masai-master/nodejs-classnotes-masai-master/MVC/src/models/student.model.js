const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        roll_no:{type:Number, required:true}, 
        batch_id:{
            type:mongoose.Schema.Types.ObjectId
            ,required:true},

    },
    {
        timestamps:true,
        versionKey:false
    }
);


const Student = mongoose.model("student", studentSchema);

module.exports= Student;