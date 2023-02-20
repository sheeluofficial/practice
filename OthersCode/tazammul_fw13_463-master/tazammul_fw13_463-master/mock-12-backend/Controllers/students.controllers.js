const express = require("express")
const route=express.Router()
const Student= require("../Models/students.model")
const test= require("../Models/tests.model")

// Route to get all students data, for testing purpose
// route.get("/", async (req, res) => {
//   return res.status(200).send(await Student.find());
// });

// Route to add studnets in database
route.post("/add-student", async(req,res)=>{
  try{
    const data= await Student.create(req.body)
    return res.status(200).send({error:false, message:"Student is added successfully.", data})
  }
  catch(err)
  {
    return res.status(400).send({erorr:true,message:err.message})
  }
})

// Route to delete a student from database
route.delete("/:id",async(req,res)=>{
  try{
      const student = await Student.findOneAndDelete({_id:req.params.id});
      
      // To delete all descendants tests of removed student
      await test.deleteMany({student:student._id})
      return res.status(200).send({error:false, message:"Deleted student successfully.", data:student});
  }catch(err){
      return res.status(400).send({erorr:true,message:err.message})
  }
})

// Route for search query on Student name
route.get("/search", async(req, res)=>{
  try{
    let {query, page, teacherID} = req.query;
    const regex = new RegExp(query, 'i')
    const count = await Student.count({$and:[{name:{$regex: regex}},{teacher:teacherID}]})

    const students = await Student.find({$and:[{name:{$regex: regex}},{teacher:teacherID}]}).skip((10*page)-10).limit(10)
    const totalPages = Math.ceil(count/10)
    return res.send({error:false, data:students, totalPages});
  }
  catch(err)
  {
    return res.status(400).send({erorr:true,message:err.message})
  }
})

// Route for filtering and sorting
route.get("/",async(req,res)=>{
  try{
      let {page,sort,filter, teacherID}=req.query;
      page=page||1;
      const limit=4;
      if(sort != "default" && filter != "both"){
          count = await Student.count({$and:[{"gender":filter},{teacher:teacherID}]})
          return res.status(200).send({data:await Student.find({$and:[{"gender":filter},{teacher:teacherID}]}).sort({"age":sort=="asc"?1:-1}).skip((limit*page)-limit).limit(limit),totalPages:Math.ceil(count/limit)});
      }else if(sort != "default"){
          count = await Student.count({teacher:teacherID})
          return res.status(200).send({data:await Student.find({teacher:teacherID}).sort({"age":sort=="asc"?1:-1}).skip((limit*page)-limit).limit(limit),totalPages:Math.ceil(count/limit)});
      }else if(filter != "both"){
          count = await Student.count({$and:[{"gender":filter},{teacher:teacherID}]})
          return res.status(200).send({data:await Student.find({$and:[{"gender":filter},{teacher:teacherID}]}).skip((limit*page)-limit).limit(limit),totalPages:Math.ceil(count/limit)});
      }
      count = await Student.count({teacher:teacherID})
      let d=await Student.find({teacher:teacherID}).skip((limit*(page-1))).limit(limit)
      return res.status(200).send({data:d,totalPages:Math.ceil(count/limit)});
  }catch(err){
      return res.status(400).send({erorr:true,message:err.message})
  }
})



// route.get("/:id",async(req,res)=>{
//   try{
//       return res.status(200).send(await Student.find({teacher:req.params.id}))
//   }catch(err){
//       return res.status(400).send({erorr:true,message:err.message})
//   }
// })
// route.get("/tests/:id",async(req,res)=>{
//   try{
//       return res.status(200).send(await test.find({Student:req.params.id}))
//   }catch(err){
//       return res.status(400).send({erorr:true,message:err.message})
//   }
// })
//all Tests
// route.get()
module.exports= route