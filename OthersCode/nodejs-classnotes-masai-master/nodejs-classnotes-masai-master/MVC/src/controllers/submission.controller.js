const express = require ("express");
const crudController=require("./crud.controller");
const router=express.Router();
const Submission = require("../models/submission.model");
const User = require("../models/user.model");
router.post("",crudController(Submission).post);
router.get("",crudController(Submission).getAll);


router.patch("/:id",async (req, res)=>{
    try{
        console.log(req.params.id)
        const item = Submission.findByIdAndUpdate(req.params.id, req.body, {true:1}).lean().exec();
        res.send(item);
    }
    catch(e){
        console.log(e.message)
        res.send(e.message);
    }
});

router.get("/max", async(req, res)=>{
    try{
        const sub=await Submission.find().lean().exec();
        sub.sort((a,b)=>{
            return b.marks-a.marks;
        });
        
        const max = await User.findById(sub[0].stud_id).lean().exec();
        res.send(max);
    }
    catch(e){
        res.send(e.message)
    }
});


module.exports=router;