const express = require ("express");
const crudController=require("./crud.controller");
const router=express.Router();
const User = require("../models/user.model");

router.post("",crudController(User).post);
router.get("",crudController(User).getAll);

module.exports=router;