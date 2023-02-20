const express = require("express")
const app = express()
const cors=require("cors")
const port = process.env.PORT || 8080
const connect = require("./Config/db")
const teacherController = require("./Controllers/teacher.controllers")
const studentController= require("./Controllers/students.controllers")
const testController = require("./Controllers/tests.controller")
app.use(express.json())
app.use(cors())
app.use("/teacher", teacherController)
app.use("/student", studentController)
app.use("/test", testController)

app.listen(port, async()=>{
    await connect()
    console.log("App is listenning to the port",  port)
})