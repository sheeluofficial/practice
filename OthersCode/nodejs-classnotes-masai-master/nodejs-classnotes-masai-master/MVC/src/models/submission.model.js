const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        eval_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"evaluation",
            required:true,
        },
        stud_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true,
        },
        marks:{type:Number, required:true},
    },
    {
        timestamps:true,
        versionKey:false,
    }
);

module.exports = mongoose.model("submission", submissionSchema);
