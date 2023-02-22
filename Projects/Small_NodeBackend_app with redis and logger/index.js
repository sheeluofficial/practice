const express  = require("express");
const connectDatabase = require("./config/db");
const Companies = require("./controllers/companies");
const Orders = require("./controllers/orders");
const Stats = require("./controllers/stats");
const dotevt = require("dotenv");
const { logRequest } = require("./loggerConfig/logger");

dotevt.config({path:"./src/config/config.env"})

const app = express()

app.use(logRequest)

app.use(express.json())

const PORT = process.env.PORT || 8080;

app.use("/api/v1",Companies)
app.use("/api/v1",Orders)
app.use("/api/v1",Stats)



// Connecting database 
//  connectDatabase()

 // Running server
app.listen(PORT,async()=>{
    console.log(`Server is running on PORT ${PORT}`)
    try{

        await connectDatabase()
        console.log("database connected")

    } catch(err) {

    }


})