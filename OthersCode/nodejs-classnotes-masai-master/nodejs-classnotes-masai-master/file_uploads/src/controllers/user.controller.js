const express = require("express");

const fs = require("fs");
const User = require("../models/user.model");
const {upload, uploadSingle} = require("../middleware/upload");

const router = express.Router();

router.get("", async(req, res)=>{
    try{
        const user = await User.find().lean().exec();
        res.send(user);
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("",uploadSingle("profile_pic"),async(req, res)=>{
    try{
        // console.log(req.file)
        // const filePaths = req.files.map((elem)=>
        //     elem.path);
        if(req.file){
            var user=await User.create(
                {
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    profile_pic:req.file.path,
                }
            );

        }
        else{
            var user=await User.create(
                {
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    profile_pic:null
                }
            );
        }
        res.send(user);
    }
    catch(er){
        res.send(er.message);
    }
});

router.patch("/:id", upload.single("profile_pic"), async(req, res)=>{

    try{
        const users = await User.findById(req.params.id).lean().exec();
        if(users.profile_pic){

            fs.unlinkSync(users.profile_pic);
        }
        
        if(req.file){
            
            req.body.profile_pic=req.file.path;
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {true:1});
        res.send(user);

    }
    catch(e){

        res.send(e.message);

    }

});

router.delete("/:id", async(req, res)=>{

    try{
        const users = await User.findById(req.params.id).lean().exec();
        if(users.profile_pic){

            fs.unlinkSync(users.profile_pic);
        }
        
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        res.send(user);

    }
    catch(e){

        res.send(e.message);

    }

});




module.exports = router;