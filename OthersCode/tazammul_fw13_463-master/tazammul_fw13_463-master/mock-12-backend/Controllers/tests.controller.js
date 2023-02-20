const express= require("express")
const route=express.Router()
const test= require("../Models/tests.model")

route.get("/", async(req,res)=>{
    try{
        return res.status(200).send(await test.find());
    }catch(err){
        return res.status(400).send({erorr:true,message:err.message})
    }
} )
route.post("/", async(req,res)=>{

        return res.status(200).send(await test.create(req.body))

})
route.delete("/:id",async(req,res)=>{
    try{
        return res.status(200).send(await test.findOneAndDelete({_id:req.params.id}));
    }catch(err){
        return res.status(400).send({erorr:true,message:err.message})
    }
})
route.patch("/:id",async(req,res)=>{
    try{
        return res.status(200).send(await test.findOneAndUpdate({_id:req.params.id},req.body,{new:true}));
    }catch(err){
        return res.status(400).send({erorr:true,message:err.message})
    }
})
module.exports=route