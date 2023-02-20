const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Post = require("../models/post.model");
const router = express.Router();

router.get("", async(req, res)=>{
    try{
        const posts = await Post.find().lean().exec();
        res.send(posts);
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("", authenticate, async(req, res)=>{
    try{
        req.body.user = req.user._id;
        const post=await Post.create(req.body);
        res.send(post);
    }
    catch(e){
        res.send(e.message);
    }
});


router.patch("/:id", authenticate, async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id).lean().exec();
        console.log(post.user.toString(),req.user._id);

        if(post.user.toString()===req.user._id){
         var posts = await Post.findByIdAndUpdate(req.params.id, req.body, {true:1})
        }
        res.send(posts);
    }
    catch(e){
        res.send(e.message);
    }
});

router.delete("/:id", authenticate, async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id).lean().exec();
        console.log(post.user.toString(),req.user._id);

        if(post.user.toString()===req.user._id){
         let   posts = await Post.findByIdAndDelete(req.params.id).lean().exec();
         res.send(posts);
        }
    }
    catch(e){
        res.send(e.message);
    }
});

module.exports = router;