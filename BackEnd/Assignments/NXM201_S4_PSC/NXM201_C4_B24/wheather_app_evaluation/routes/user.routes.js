
const { Router } = require("express");
const { authenticator } = require("../middlewares/auth");
const { login, logout, signup } = require("../controllers/user.controllers");

const userRouter = Router();

userRouter.post("/login", login);

userRouter.post("/signup", signup);

userRouter.get("/logout",authenticator, logout);

module.exports = { userRouter };
