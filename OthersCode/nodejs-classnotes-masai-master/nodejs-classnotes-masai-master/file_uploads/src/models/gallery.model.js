const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        pictures:[{
            type:String,required:true,
        }],
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
        }
    },
    {
        versionKey:false,
    }

);

module.exports = mongoose.model("profile_picGallery", gallerySchema);
