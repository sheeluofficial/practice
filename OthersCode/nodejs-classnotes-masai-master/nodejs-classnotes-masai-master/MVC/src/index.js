const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const subController = require("./controllers/submission.controller");
const studentController = require("./controllers/student.controller");
const evalController = require("./controllers/evaluation.controller");
const batchController = require("./controllers/batch.controller");

const app=express();

app.use(express.json());

app.use("/user", userController);
app.use("/batch", batchController);
app.use("/eval", evalController);
app.use("/student", studentController);
app.use("/sub", subController);



app.listen(4000, async ()=>{
    await connect();
    console.log("Listening at 4000");

});





