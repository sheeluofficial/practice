const express = require("express");
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const route = express.Router();
const teacherModel = require("../Models/teacher.model");
var secret = "kbDHB893bjk";

// Route to get all teachers data, for testing purpose
route.get("/", async (req, res) => {
  return res.status(200).send(await teacherModel.find());
});

// Route to register a teacher in database
route.post("/register", async (req, res) => {
  try {
    const check = await teacherModel.findOne({ email: req.body.email });
    if (check)
      return res.status(400).send({
        error: true,
        message: "A teacher is already registerd with this email ID.",
      });
    let Salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, Salt);
    const teacher = await teacherModel.create(req.body);

    return res
      .status(200)
      .send({
        error: false,
        message: "You are registered successfully.",
        data: teacher,
      });
  } catch (err) {
    return res.status(400).send({ error: true, message: err.message });
  }
});

// Route to login a teacher by verifying email id and password.
route.post("/login", async (req, res) => {
  try {
    const teacher = await teacherModel.findOne({ email: req.body.email });
    if (teacher) {
      const checkPass = await bcryptjs.compare(
        req.body.password,
        teacher.password
      );
      if (checkPass) {
        const token = jwt.sign({ email: teacher.email, teacherID:teacher._id }, secret);
        return res.status(200).send({
          error: false,
          message: "Logged In Successfully.",
          token,
          data:teacher,
          teacherID:teacher._id
        });
      } else {
        return res
          .status(400)
          .send({ error: true, message: "Wrong Credentials !!!" });
      }
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Wrong Credentials !!!" });
    }
  } catch (err) {
    return res.status(400).send({ error: true, message: err.message });
  }
});

// Route to verify a teacher based on given token
route.get("/verify", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    return res
      .status(200)
      .send({ error: false, message: "Verified Successfully", data: decoded });
  } catch (err) {
    return res.status(400).send({ error: true, message: err.message });
  }
});

module.exports = route;
