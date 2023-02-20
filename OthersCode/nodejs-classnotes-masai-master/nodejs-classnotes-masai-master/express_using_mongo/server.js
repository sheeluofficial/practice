const express=require("express");
const mongoose=require("mongoose");
const app = express();


//step 1 : connect to mongodb

const connect = ()=>{
    //also write local db address i.e <<  mongodb://127.0.0.1:27017/dbname
    return mongoose.connect("mongodb+srv://abhishek:abhi_123@cluster0.re1nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
};

//step 2 : create a schema
const userSchema = new mongoose.Schema({
    id:{type: Number, required:true},
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    age:{type:Number, required:true},
});

//step 3: create a model
let User;
try{
     User = mongoose.model("user", userSchema);
}
catch(e){
    console.log(e.message);
}



app.get("/users",async (req,res)=>{
    
    const users = await User.find().lean().exec();  //--same as --> db.users.find()
    res.send(users);
})
app.listen(4000,async ()=>{

    try{
        
        await connect();
        console.log("Listening at 4000")
    }
    catch(e){
        console.log(e.message);
    }
})