const express = require ("express");
const crudController=require("./crud.controller");
const router=express.Router();
const Student = require("../models/student.model");

router.post("",crudController(Student).post);
router.get("",crudController(Student).getAll);

module.exports=router;