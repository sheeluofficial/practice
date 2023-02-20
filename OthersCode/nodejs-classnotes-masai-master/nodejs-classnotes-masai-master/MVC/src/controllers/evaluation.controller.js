const express = require ("express");
const crudController=require("./crud.controller");
const router=express.Router();
const Evaluation = require("../models/evaluation.model");
const Student = require("../models/student.model");

router.post("",crudController(Evaluation).post);
router.get("",crudController(Evaluation).getAll);

router.get("/:id", async(req, res)=>{
    try{
        const eval =await Evaluation.findById(req.params.id).lean().exec();
        let bId=eval["batch_id"];

        const stud = await Student.find({batch_id:bId}).lean().exec();
        res.send(stud);

    }
    catch(e){
        res.send(e.message);
    }
});


module.exports=router;