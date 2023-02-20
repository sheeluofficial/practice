const mongoose = require("mongoose");

const connect = ()=>{

    return mongoose.connect("mongodb+srv://abhishek:abhi_123@cluster0.re1nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

}

module.exports = connect;