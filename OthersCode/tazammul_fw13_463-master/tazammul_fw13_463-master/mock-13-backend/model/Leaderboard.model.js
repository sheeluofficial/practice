const mongoose = require("mongoose");

const Leaderboard = mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"user"},
    bestScore:{type:mongoose.Types.ObjectId, ref:"score"}
},
{
    versionKey:false,
    timestamps:true
})

module.exports = new mongoose.model("leaderboard", Leaderboard);