const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name:{type:String, required:true},
        last_name:{type:String, required:true},
        email:{type:String, required:true}
    },
    {
        versionKey:false,
    }
);

module.exports = mongoose.model("newuser", userSchema);
