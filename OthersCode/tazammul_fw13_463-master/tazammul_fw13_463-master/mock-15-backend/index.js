const express = require("express");
const app = express();
const connect = require("./config/db");
const wordController = require("./controllers/word.controller");
const userController = require("./controllers/user.controller");

const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/user", userController);
app.use("/word", wordController);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await connect();
  console.log(`server connected to the port ${port}`);
});



// ======== other stuff ======== //
module.exports = app;