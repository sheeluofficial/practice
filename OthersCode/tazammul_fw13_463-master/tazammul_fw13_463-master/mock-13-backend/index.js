const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const userController = require("./controllers/User.controller");
const scoreController = require("./controllers/Score.controller")
const leaderboardController = require("./controllers/Leaderboard.controller");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userController)
app.use('/score', scoreController)
app.use('/leaderboard', leaderboardController)

app.listen(PORT, async()=>{
    await connect();
    console.log("Server is running on PORT ", PORT);
})