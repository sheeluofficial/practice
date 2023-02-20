const express  = require("express");
const connectDatabase = require("./config/db");
const Companies = require("./controllers/companies");
const Orders = require("./controllers/orders");
const Stats = require("./controllers/stats");


dotevt.config({path:"./src/config/config.env"})
router
const app = express()
const PORT = process.env.PORT || 8080;

app.use("/api/v1",Companies)
app.use("/api/v1",Orders)
app.use("/api/v1",Stats)


// Connecting database 
 connectDatabase()

 // Running server
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})