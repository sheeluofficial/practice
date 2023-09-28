const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../helpers/redis");

const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const isUserPresent = await User.findOne({ email });

      if (!isUserPresent) return res.send("User not present, register please");

      const isPasswordCorrect = await bcrypt.compareSync(
        password,
        isUserPresent.password
      );

      if (!isPasswordCorrect) return res.send("Invalid credentials");

      const token = await jwt.sign(
        { userId: isUserPresent._id, preferred_city:isUserPresent.preferred_city  },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.send({ msg: "Login success", token });
    } catch (error) {
      res.send(error.message);
    }
  }

const signup = async (req, res) => {
    try {
      const { email, password, name, preferred_city } = req.body;
      const isUserPresent = await User.findOne({ email });
      if (isUserPresent) return res.send("User already present, login please");
      const hash = await bcrypt.hashSync(password, 8);
      const newUser = new User({ name, email, password: hash, preferred_city });
      await newUser.save();
      res.send("signup successful");
    } catch (error) {
      res.send(error.message);
    }
  }

  const logout = async (req, res) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      if (!token) return res.sendStatus(403);
      await redisClient.set(req.body.userId,token,{EX:30});
      res.send("Logout successful");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  };

  module.exports  = {login,logout,signup}