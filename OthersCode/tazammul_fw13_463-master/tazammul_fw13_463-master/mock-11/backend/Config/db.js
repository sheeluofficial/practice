const mongoose =require('mongoose');

module.exports=()=>new mongoose.connect(`mongodb+srv://mock-11:mock-11@cluster0.tj0s39b.mongodb.net/blogs-db?retryWrites=true&w=majority`);

