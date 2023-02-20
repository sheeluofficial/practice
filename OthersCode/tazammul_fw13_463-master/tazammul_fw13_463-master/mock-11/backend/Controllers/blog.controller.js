const express=require('express');
const route=express.Router();
const Blog = require("../Models/blog.model");
var jwt = require('jsonwebtoken');

var secret = "w34wPAk0bYQy";

route.get("/allblogs", async(req, res)=>{
    try{
        const blogs = await Blog.find().populate("user");
        return res.status(200).send({error:false, data:blogs});
    }
    catch(err)
    {
        return res.status(400).send({error:true, message:err.message});
    }
})

route.get("/", async(req, res)=>{
    try{
        let {category, author} = req.query;
        let blogs=[]
        if(category!="all" && author!="all"){
            blogs=await Blog.find({category:category,author:author}).populate("user");
        }else if(category != "all"){
            blogs=await Blog.find({category:category}).populate("user");
        }else if(author != "all"){
            blogs=await Blog.find({author:author}).populate("user");
        }else{
            blogs=await Blog.find().populate("user");
        }
        return res.status(200).send({error:false, data:blogs});
    }
    catch(err)
    {
        return res.status(400).send({error:true, message:err.message});
    }
})

route.get("/myblogs", async(req, res)=>{
    try{
        let {user, category} = req.query;
        let blogs = [];
        if(category=="all")
            blogs = await Blog.find({user:user}).populate("user")
        else
            blogs = await Blog.find({user:user, category:category}).populate("user")
        return res.status(200).send({error:false, data:blogs});
    }
    catch(err)
    {
        return res.status(400).send({error:true, message:err.message});
    }
})

route.post("/", async(req, res)=>{
    try{
        const blogs = await Blog.create(req.body)
        return res.status(200).send({error:false, data:blogs});
    }
    catch(err)
    {
        return res.status(400).send({error:true, message:err.message});
    }
})

route.patch("/:id", async(req, res)=>{
    try{
        const blogs = await Blog.findOneAndUpdate({_id:req.params.id}, req.body, {new:true});
        return res.status(200).send({error:false, data:blogs});
    }
    catch(err)
    {
        return res.status(400).send({error:true, message:err.message});
    }
})

route.delete("/:id", async(req, res)=>{
    try{
        const blogs = await Blog.findOneAndDelete({_id:req.params.id});
        return res.status(200).send({error:false, data:blogs});
    }
    catch(err)
    {
        return res.status(400).send({error:true, message:err.message});
    }
})



module.exports=route;