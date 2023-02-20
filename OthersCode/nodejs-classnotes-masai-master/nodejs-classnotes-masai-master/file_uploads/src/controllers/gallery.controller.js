const express = require("express");
const fs=require("fs");
const Gallery = require("../models/gallery.model");
const router=express.Router();
const {upload} = require("../middleware/upload");


router.get("", async(req, res)=>{
    try{
        const gallery = await Gallery.find().lean().exec();
        res.send(gallery);
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("",upload.array("pictures",1),async(req, res)=>{
    try{

        const filePaths = req.files.map((elem)=>
            elem.path);
            var gallery=await Gallery.create(
                {
                    user_id:req.body.user_id,
                    pictures:filePaths,
                }
            );
        res.send(gallery);
    }
    catch(er){
        res.send(er.message);
    }
});

router.delete("/:id", async(req, res)=>{
    try{
        const gallery = await Gallery.findById(req.params.id).lean().exec();
        let pictures=gallery.pictures;
        if(pictures.length>0){
            pictures.forEach(element => {
                fs.unlinkSync(element);
            });
        }
        await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        res.send("all pictures deleted");
    }
    catch(e){
        res.send(e.message);
    }
})


module.exports = router;