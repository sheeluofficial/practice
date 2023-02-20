const mongoose = require("mongoose")

const Student = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    image:{type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Hy7fOrAjiEtgHwrpb969lel309cEpasXpg&usqp=CAU"},
    gender:{type:String, required:true},
    teacher: {type:mongoose.Types.ObjectId, refs:"teacher",required:true}     

},{
    versionKey:false,
    timestamps:true
})
module.exports = new mongoose.model("student", Student)
