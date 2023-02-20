const express = require("express");

const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.send(users);
  } catch (e) {
    res.send(e.message);
  }
});

router.post(
  "",
  body("first_name").isString().isLength({ min: 3, max: 20 }),
  body("last_name").isString().isLength({ min: 3, max: 20 }),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const users = await User.find({ email: value }).countDocuments();
      if (users != 0) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("pincode").isLength({ min: 6, max: 6 }),
  body("age").isFloat({ min: 1, max: 100 }),
  body("gender")
    .isLength({ min: 4 })
    .custom((value) => {
      if (value === "Male" || value === "Female" || value === "Others") {
        return true;
      }
      throw new Error("gender not valid");
    }),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.errors.length > 0) {
        let arr = [];
        error.errors.forEach((elem) => {
          arr.push({ msg: elem.msg, param: elem.param });
        });
        res.send(arr);
      }
      const user = await User.create(req.body);
      res.send(user);
    } catch {}
  }
);

module.exports = router;
