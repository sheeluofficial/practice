const router = require("express").Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).send({ error: false, data: user });
  } catch (err) {
    return res.status(400).send({ error: true, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find().sort({ score: -1 });
    return res.status(200).send({error:false, data:user});
  } catch (err) {
    return res.status(400).send({ erorr: true, message: err.message });
  }
});

module.exports = router;
