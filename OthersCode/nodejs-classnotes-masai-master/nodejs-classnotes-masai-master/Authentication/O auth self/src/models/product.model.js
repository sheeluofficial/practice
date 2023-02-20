const mongoose = require("mongoose");

const prodSchema = mongoose.Schema(
    {
        title:{type:String, required:true},
        price:{type:Number, required:true},
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        }
    }
);

module.exports = new mongoose.model("product", prodSchema);