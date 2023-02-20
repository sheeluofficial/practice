const dictionary = require("../models/dictionary.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let word = await dictionary.aggregate([{ $sample: { size: 1 } }])
   return res.status(200).send({word:word[0].word})
  } catch (err) {
    return res.status(400).send({ error: true, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const word = await dictionary.create(req.body);
    return res.status(200).send({ error: false, word });
  } catch (err) {
    return res.status(400).send({ error: true, message: err.message });
  }
});


module.exports = router;
