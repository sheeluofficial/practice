const mongoose = require("mongoose");

module.exports = ()=>{

    return mongoose.connect(
        "mongodb+srv://abhishek:abhi_123@cluster0.re1nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );    

}