const express = require ("express");
const mongoose = require("mongoose");

const app=express();

app.use(express.json());

const connect = ()=>{
    return mongoose.connect(
    "mongodb+srv://abhishek:abhi_123@cluster0.re1nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
}

// ------------------POST MODEL
const postSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        body:{type:String, required:true},
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        // tag_ids:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref="tag",
        // }],
    },
    {
        timestamps:true,
    }
);

const Post = mongoose.model("post", postSchema);

//------------------------------User Model

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true, default:"Male"},
},
{
    timestamps:true,
    versionKey:false
});

const User = mongoose.model("user", userSchema);

//----------------------------Tag Model

const tagSchema=new mongoose.Schema(
    {
        name:{type: String, required:true},
    },
    {
        timestamps:true,
    }
);

const Tag = mongoose.model("tag", tagSchema);

//------------------------------CommentModel
const commentSchema = new mongoose.Schema(
    {
        comment:{type:String, required:true},
        post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post",
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Comment = mongoose.model("comment", commentSchema);

// ----------------------------------------------------


//------------------- user CRUD -------------------

app.get("/users",async (req, res)=>{
    try{
        const users=await User.find().lean().exec();
        res.status(201).send(users);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

app.get("/users/:id",async (req, res)=>{
    try{
        const user = await User.findById(req.params.id).lean().exec();
        if(user){
            res.status(202).send(user);
        }
        else{
            res.status(404).send("User Not Found");
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
});


app.post("/users", async (req, res)=>{
    try{
        console.log(req.body)
        const users=await User.create(req.body);
        return res.status(201).send(users);
    }
    catch(er){
        res.status(500).send(er.message);
    }
});
 app.patch("users/:id", async(req, res)=>{
     try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            true:1,
        });
        res.send(user);
     }
     catch(er){
        res.status(500).send(er.message);
     }
 })

app.delete("/users/:id",async (req, res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user);
    }
    catch(e){
        res.status(500).send(er.message);
    }
})

// ---------------------------- Post CRUD -----------
app.get("/posts", async(req, res)=>{
    try{
        const posts=await Post.find()
        .populate({path:"user_id", select:"name"})
        .lean().exec();
        res.send(posts);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

app.get("/posts/:id", async(req , res)=>{
    try{
        const post=await Post.findById(req.params.id).lean().exec();
        res.send(post);
    }
    catch(er){
        res.status(500).send(er.message);
    }
});

app.post("/posts", async(req, res)=>{
    try{
        const post = await Post.create(req.body);
        res.send(post);
    }
    catch(er){
        res.status(500).send(er.message);
    }
});

app.patch("posts/:id", async (req, res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(post);
    }
    catch(er){
        res.status(500).send(er.message);
    }
})

app.delete("/posts/:id", async (req, res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
        res.send(post);
    }
    catch(er){
        res.status(500).send(er.message);
    }
})

// ------------------------------------Server Listening----------------
app.listen(4000, async ()=>{
    try{
        await connect();
        console.log("Listening at 4000");
    }
    catch(er){
        console.log(er.message);
    }
})