const express = require ("express");
const crudController=require("./crud.controller");
const router=express.Router();
const Batch = require("../models/batch.model");

router.post("",crudController(Batch).post);
router.get("",crudController(Batch).getAll);


module.exports=router;