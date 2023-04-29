const express = require("express");

const { connection } = require("./config/db.js");
const { authenticator } = require("./middlewares/auth.js");
const { userRouter } = require("./routes/user.routes");
const { cityRouter } = require("./routes/cities.routes");
const { logger } = require("./middlewares/logger.js");
const redisLimiter = require("./middlewares/redisLimiter.js");
const { redisClient } = require("./helpers/redis.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

let loggerTouse = (req,res,next)=>{
  logger.log("info",`A ${req.method} request is made on url: ${req.url} `)
  next()
}

app.use(loggerTouse);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(redisLimiter)

app.get("/",  async(req, res) => {

  res.send(await redisClient.get("name"));
});

app.use("/user/api", userRouter);
app.use(authenticator);
app.use("/weather/api",cityRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log(`listening on http://localhost:8080`);
  } catch (error) {
    console.log(error.message);
  }
});
